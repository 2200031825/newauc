    // Home.js
    import React from 'react';
    import './home.css';
    import logouticon from './images/logout.png';
    import { callApi, errorResponse, getSession, setSession } from './main';
    import menuicon from './images/menu.png';

    // CSS styles
    const titleStyle = { paddingLeft: '5px', fontWeight: 'bold', fontSize: '24px' };
    const userLabelStyle = { float: 'right', paddingRight: '20px', fontSize: '14px' };
    const logoutStyle = { fontSize: '14px', float: 'right', paddingRight: '5px', cursor: 'pointer' };

    class Home extends React.Component {
        constructor() {
            super();
            this.sid = getSession('sid');
            if (this.sid === '') window.location.replace('/');

            const url = 'http://localhost:5000/home/uname';
            const data = JSON.stringify({
                emailid: this.sid
            });
            callApi('POST', url, data, this.loadUname, errorResponse);

            const menuUrl = 'http://localhost:5000/home/menu';
            callApi('POST', menuUrl, '', this.loadMenu, errorResponse);
        }

        loadUname = (res) => {
            const data = JSON.parse(res);
            const HL1 = document.getElementById('HL1');
            HL1.innerHTML = `<img src="${data[0].profileImageUrl}" alt="" class="userImage" /> ${data[0].firstname} ${data[0].lastname}`;
        }

        loadMenu = (res) => {
            const data = JSON.parse(res);
            let list = '';
            for (const item of data) {
                list += `<li>
                            <label id='${item.mid}L'>${item.mtitle}</label>
                            <div id='${item.mid}'></div>
                        </li>`;
            }
            const mlist = document.getElementById('mlist');
            mlist.innerHTML = list;

            for (const item of data) {
                document.getElementById(`${item.mid}L`).addEventListener('click', () => this.showSMenu(item.mid));
            }
        }

        loadSMenu = (res) => {
            const data = JSON.parse(res);
            let slist = '';
            for (const item of data) {
                slist += `<label id='${item.smid}'>${item.smtitle}</label>`;
            }
            const smenu = document.getElementById(`${data[0].mid}`);
            smenu.innerHTML = slist;

            for (const item of data) {
                document.getElementById(`${item.smid}`).addEventListener('click', () => this.loadModule(item.smid));
            }
        }

        loadModule = (smid) => {
            const titlebar = document.getElementById('titlebar');
            const module = document.getElementById('module');
            switch (smid) {
                case 'M10102':
                    module.src = '/myprofile';
                    titlebar.innerText = 'My Profile';
                    break;
                case 'M10103':
                    module.src = '/changepassword';
                    titlebar.innerText = 'Change Password';
                    break;
                case 'M00201':
                    module.src = '/ItemsList';
                    titlebar.innerText = 'VIEW ITEMS';
                    break;
                case 'M10101':
                    module.src = '/Inbox';
                    titlebar.innerText = 'INBOX ITEMS';
                    break;
                case 'M00102':
                        module.src = '/ViewStatus';
                        titlebar.innerText = 'VIEW STATUS';
                        break;
                default:
                    module.src = '';
                    titlebar.innerText = '';
            }
        }

        showSMenu = (mid) => {
            const surl = 'http://localhost:5000/home/menus';
            const ipdata = JSON.stringify({
                mid: mid
            });
            callApi('POST', surl, ipdata, this.loadSMenu, errorResponse);

            const smenu = document.getElementById(mid);
            smenu.style.display = smenu.style.display === 'block' ? 'none' : 'block';
        }

        logout = () => {
            setSession('sid', '', -1);
            window.location.replace('/');
        }

        render() {
            return (
                <div className='fullheight'>
                    <div className='header'>
                        <label style={titleStyle}>BIDMAR | AUCTION BIDDING WEBSITE</label>
                        <label style={logoutStyle} onClick={this.logout}>Logout</label>
                        <img src={logouticon} alt='' className='logouticon' onClick={this.logout} />
                        <label id='HL1' style={userLabelStyle}></label>
                    </div>
                    <div className='content'>
                        <div className='menubar'>
                            <div className='menuheader'>
                                <img src={menuicon} alt='' />
                                <label>Menu</label>
                            </div>
                            <div className='menu'>
                                <nav><ul id='mlist' className='mlist'></ul></nav>
                            </div>
                        </div>
                        <div className='outlet'>
                            <div id='titlebar'></div>
                            <iframe id='module' src='' title='module'></iframe>
                        </div>
                    </div>
                    <div className='footer'>Copyright @BIDMAR. All rights reserved.</div>
                </div>
            );
        }
    }

    export default Home;
