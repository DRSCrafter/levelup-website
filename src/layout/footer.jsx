import '../Styles/layout/footer.css';
import React from "react";

import TelegramIcon from '@mui/icons-material/Telegram';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LinkIcon from '@mui/icons-material/Link';
import Survey from "./survey";

function Footer() {
    return (
        <>
            <div className="footer-root">
                <Survey/>
                <div className="footer-container">
                    <span className="footer-list-container">
                        <span className="footer-list-title"><h4>اجتماع</h4></span>
                        <ul className="footer-list">
                            <li><a href="src/layout/footer.jsx">تلگرام</a></li>
                            <li><a href="src/layout/footer.jsx">واتساپ</a></li>
                            <li><a href="src/layout/footer.jsx">لینکداین</a></li>
                            <li><a href="src/layout/footer.jsx">گیت هاب</a></li>
                        </ul>
                    </span>
                    <span className="footer-list-container">
                        <span className="footer-list-title"><h4>لینک های مرتبط</h4></span>
                        <ul className="footer-list">
                            <li><a href="https://github.com/DRSCrafter/levelup-website">سورس وبسایت</a></li>
                            <li><a href="https://github.com/DRSCrafter?tab=repositories">پروژه های دیگر</a></li>
                        </ul>
                    </span>
                    <span className="footer-list-container">
                        <span className="footer-list-title"><h4>ارتباط با توسعه دهنده</h4></span>
                        <ul className="footer-list">
                            <li><a href="mailto:drsprogrammgin2020@gmail.com"><AlternateEmailIcon/> drsprogramming2020@gmail.com</a></li>
                            <li><a href="src/layout/footer.jsx"><TelegramIcon/> Codesman@</a></li>
                            <li><a href="https://zil.ink/arasteh0012"><LinkIcon/> zil.ink/arasteh0012</a></li>
                        </ul>
                    </span>
                </div>
            </div>
        </>
    );
}

export default Footer;
