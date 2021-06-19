import React from 'react'
import logoCgv from './logo/cgv.png'
import logoBhd from './logo/bhd.png'
import logoCinestar from './logo/cinestar.png'
import logoGalaxy from './logo/galaxycine.png'
import logoMegags from './logo/megags.png'
import logoCnx from './logo/cnx.jpg'
import logoLotte from './logo/lotte.png'
import logoDongda from './logo/dongdacinema.png'
import logoBt from './logo/bt.jpg'
import './Footer.css'

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content text-center">
        <div className="row">
          <div className="col-4 d-none d-sm-block col-lg-3 item">
            <p>CyberSoft</p>
            <ul>
              <li><a href="!#">Giới thiệu</a></li>
              <li><a href="!#">FAQ</a></li>
              <li><a href="!#">Liên hệ</a></li>
            </ul>
          </div>
          <div className="col-4 d-none d-sm-block col-lg-3 item">
            <p>Điều khoản sử dụng</p>
            <ul className="ml-2 pl-5 text-left">
              <li><a href="!#">Điều khoản chung</a></li>
              <li><a href="!#">Điều khoản giao dịch</a></li>
              <li><a href="!#">Điều khoản thanh toán</a></li>
              <li><a href="!#">Điều khoản bảo mật</a></li>
              <li><a href="!#">Câu Hỏi thường gặp</a></li>
            </ul>
          </div>
          <div className="col-12 d-none d-lg-block col-lg-3 item">
            <p>Đối tác</p>
            <ul>
              <li className="logoL">
                <a href="https://www.cgv.vn/" className="logo"><img src={logoCgv} alt="" /></a>
                <a href="https://www.galaxycine.vn/" className="logo"><img src={logoGalaxy} alt="" /></a>
                <a href="http://lottecinemavn.com/LCHS/index.aspx"><img src={logoLotte} alt="" /></a>

              </li>
              <li className="logoL">
                <a href="https://www.bhdstar.vn/" className="logo"><img src={logoBhd} alt="" /></a>
                <a href="https://www.megagscinemas.vn/" className="logo"><img src={logoMegags} alt="" /></a>
                <a href="http://ddcinema.vn/"><img src={logoDongda} alt="" /></a>

              </li>
              <li className="logoL">
                <a href="http://cinestar.com.vn/" className="logo"><img src={logoCinestar} alt="" /></a>
                <a href="https://cinemaxvn.com/" className="logo"><img src={logoCnx} alt="" /></a>
                <a href="https://www.betacinemas.vn/home.htm"><img src={logoBt} alt="" /></a>
              </li>
            </ul>
          </div>
          <div className="col-12 col-sm-4 col-lg-3 item">
            <p>Liên hệ</p>
            <ul>
              <li><a href="https://www.facebook.com/duyhoang3820"><i className="fab fa-facebook-f"></i>Phúc Duy</a> </li>
            </ul>
          </div>
        </div>

      </div>
    </div>);
}

export default Footer;