import React from "react";
import { MDBContainer, MDBRow, MDBCol,MDBBtn } from "mdbreact";
import styles from "./style.module.scss";
import "./index.css";
import cx from "classnames";
import ti from "./img/tí sli.jpg";
import thienthan from "./img/thiên thần sli.jpg";
import latmat from "./img/lat mat slider(1).jpg";
import film1 from "./img/latmat.jpg";
import film2 from "./img/conan_24_-_main_poster_1_.jpg";
import film3 from "./img/btdquy.jpg";
const Home = () => {
  return (
    <div className={styles.wrapper_template}>
      <div className={styles.wrapper_content}>
        <MDBContainer>
          <MDBRow className={styles.row_full_screen}></MDBRow>
        </MDBContainer>
        <section class="slider">
            <div
              id="carouselExampleCaptions"
              class="carousel slide carousel-fade"
              data-ride="carousel"
            >
              <ol class="carousel-indicators container">
                <li
                  data-target="#carouselExampleCaptions"
                  data-slide-to="0"
                  class="active"
                ></li>
                <li
                  data-target="#carouselExampleCaptions"
                  data-slide-to="1"
                ></li>
                <li
                  data-target="#carouselExampleCaptions"
                  data-slide-to="2"
                ></li>
              </ol>
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src={latmat} class="d-block w-100" alt="..." />
                  <div class="carousel-caption container d-none d-md-block text-left">
                    <p class="text-warning lead">ACTION, ADVENTURE, FANTASY</p>
                    <h1 class="display-4">End of the World: Part II</h1>
                    <p>
                      Claritas est etiam processus dynamicus, qui sequitur
                      mutationem consuetudium lectorum. Mirum est notare quam
                      littera gothica, quam nunc putamus parum.
                    </p>
                    <div>
                      <span class="border d-inline-block rounded-circle text-center">
                        PG
                      </span>
                      <button>
                        <i class="fa fa-play"></i>
                        PLay TRAILER
                      </button>
                    </div>
                  </div>
                </div>
                <div class="carousel-item">
                  <img src={ti} class="d-block w-100" alt="..." />
                  <div class="carousel-caption container d-none d-md-block text-left">
                    <p class="text-warning lead">ACTION, ADVENTURE, FANTASY</p>
                    <h1 class="display-4">End of the World: Part II</h1>
                    <p>
                      Claritas est etiam processus dynamicus, qui sequitur
                      mutationem consuetudium lectorum. Mirum est notare quam
                      littera gothica, quam nunc putamus parum.
                    </p>
                    <div>
                      <span class="border d-inline-block rounded-circle text-center">
                        PG
                      </span>
                      <button>
                        <i class="fa fa-play"></i>
                        PLay TRAILER
                      </button>
                    </div>
                  </div>
                </div>
                <div class="carousel-item">
                  <img src={thienthan} class="d-block w-100" alt="..." />
                  <div class="carousel-caption container d-none d-md-block text-left">
                    <p class="text-warning lead">ACTION, ADVENTURE, FANTASY</p>
                    <h1 class="display-4">End of the World: Part II</h1>
                    <p>
                      Claritas est etiam processus dynamicus, qui sequitur
                      mutationem consuetudium lectorum. Mirum est notare quam
                      littera gothica, quam nunc putamus parum.
                    </p>
                    <div>
                      <span class="border d-inline-block rounded-circle text-center">
                        PG
                      </span>
                      <button class="position-relative">
                        <i class="fa fa-play"></i>
                        PLay TRAILER
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* ////   list movie */}

          <div class="all m-auto" id="film-new">
            <div class="container m-auto py-5">
              <div class="row title-list py-4">
                <div class="co mr-3 line-content">
                  <div class="line"></div>
                </div>
                <div class="co title text-light">
                  <h2>Phim mới</h2>
                  <p>Lorem ipsum dolor sit amet consectetur.</p>
                  <div class="line2"></div>
                </div>
              </div>
              <div class="row m-auto">
                <div class="col-md-12 py-4 m-auto">
                  <div class="owl-carousel owl-theme">
                    <div class="item">
                      <div class="cardd text-center m-auto">
                        <div class="overlay"></div>
                        <img src={film1}   alt="" />

                        <div class="title-card">
                          <h4>dsa</h4>
                          <p></p>
                        </div>
                        <div class="tag-title">
                          <div class="img-play">
                            <a
                              class="venobox"
                              data-autoplay="true"
                              data-vbtype="video"
                            >
                              <i class="fas fa-play-circle"></i>
                            </a>
                          </div>
                          <div class="date">dsads</div>
                          <div class="time">dsa</div>
                        </div>
                        <div class="btn-bookve">
                          <MDBBtn color="red" className="w-100">
                            Đặt Vé
                          </MDBBtn>
                        </div>
                      </div>
                      <div class="cardd text-center m-auto">
                        <div class="overlay"></div>
                        <img src={film2} alt="" />

                        <div class="title-card">
                          <h4>dsa</h4>
                          <p></p>
                        </div>
                        <div class="tag-title">
                          <div class="img-play">
                            <a
                              class="venobox"
                              data-autoplay="true"
                              data-vbtype="video"
                            >
                              <i class="fas fa-play-circle"></i>
                            </a>
                          </div>
                          <div class="date">dsads</div>
                          <div class="time">dsa</div>
                        </div>
                        <div class="btn-bookve">
                          <MDBBtn color="red" className="w-100">
                            Đặt Vé
                          </MDBBtn>
                        </div>
                      </div>
                      <div class="cardd text-center m-auto">
                        <div class="overlay"></div>
                        <img src={film3} alt="" />

                        <div class="title-card">
                          <h4>dsa</h4>
                          <p></p>
                        </div>
                        <div class="tag-title">
                          <div class="img-play">
                            <a
                              class="venobox"
                              data-autoplay="true"
                              data-vbtype="video"
                            >
                              <i class="fas fa-play-circle"></i>
                            </a>
                          </div>
                          <div class="date">dsads</div>
                          <div class="time">dsa</div>
                        </div>
                        <div class="btn-bookve">
                          <MDBBtn color="red" className="w-100">
                            Đặt Vé
                          </MDBBtn>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =======list_film =======================*/}

          <div class="container m-auto py-5" id="lich-chieu">
            <div class="row title-list py-4">
              <div class="co mr-3 line-content">
                <div class="line"></div>
              </div>

              <div class="co title">
                <h2>Lịch chiếu</h2>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
                <div class="line2"></div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <table class="table w-100 table-dark">
                  <thead>
                    <tr class="text-center">
                      <th>Phim</th>
                      <th>Giờ chiếu</th>
                      <th>Cụm rạp</th>
                      <th>Book</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="text-center">
                      <td>Bố già</td>
                      <td>16/04/2021</td>
                      <td>Galaxy Tân Bình</td>
                      <button class="btn red">Đặt ngay</button>
                    </tr>
                    <tr class="text-center">
                      <td>Bố già</td>
                      <td>16/04/2021</td>
                      <td>Galaxy Tân Bình</td>
                      <button class="btn red">Đặt ngay</button>
                    </tr>
                    <tr class="text-center">
                      <td>Bố già</td>
                      <td>16/04/2021</td>
                      <td>Galaxy Tân Bình</td>
                      <button class="btn red">Đặt ngay</button>
                    </tr>
                    <tr class="text-center">
                      <td>Bố già</td>
                      <td>16/04/2021</td>
                      <td>Galaxy Tân Bình</td>
                      <button class="btn red">Đặt ngay</button>
                    </tr>
                    {/*tạm thời m làm 1 mình m 1 nhánh, nên có làm gì thì cứ 
                    git add .
                    git commit -m "nội dung commit" (có 2 dấu nháy)
                    git push (nếu pú lỗi thì git push origin style)

                    còn khi nào t cần m tải source mới về thì t remote làm cho
                    h 
                    */}
                    <tr class="text-center">
                      <td>Bố già</td>
                      <td>16/04/2021</td>
                      <td>Galaxy Tân Bình</td>
                      <button class="btn red">Đặt ngay</button>
                    </tr>
                    <tr class="text-center">
                      <td>Bố già</td>
                      <td>16/04/2021</td>
                      <td>Galaxy Tân Bình</td>
                      <button class="btn red">Đặt ngay</button>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* TIN Tức new */}

          <div class="container mb-5" id="news">
            <div class="row title-list py-4">
              <div class="co mr-3 line-content">
                <div class="line"></div>
              </div>

              <div class="co title">
                <h2>Tin tức phim</h2>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
                <div class="line2"></div>
              </div>
            </div>
            {/* <!-- Nav pills --> */}
            <div class="center text-center m-auto ">
              <ul class="nav nav-pills nav-news" role="tablist">
                <li class="nav-item">
                  <p class="nav-link active" data-toggle="pill" href="#home111">
                    Tin tức phim
                  </p>
                </li>
                <li class="nav-item">
                  <p class="nav-link" data-toggle="pill" href="#menu111">
                    Bình luận phim
                  </p>
                </li>
                <li class="nav-item">
                  <p class="nav-link" data-toggle="pill" href="#menu112">
                    Khuyến mãi
                  </p>
                </li>
              </ul>
            </div>
            {/* <!-- Tab panes --> */}
            <div class="tab-content">
              <div id="home111" class="container tab-pane active">
                <br />
                <div class="row">
                  <div class="col-md-6 m-auto">
                    <div class="card m-auto">
                      <img
                        class="img-fluid"
                        src="https://s3img.vcdn.vn/123phim/2019/02/nhom-nhac-huyen-thoai-the-beatles-bi-xoa-so-trong-trailer-phim-moi-cua-dao-dien-trieu-phu-khu-o-chuot-15502005688824.jpg"
                        alt="img-news"
                      />
                      <div class="news-title">
                        <h4>Cua lại vợ bầu phim mới hay nhất</h4>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. 
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 m-auto">
                    <div class="card m-auto">
                      <img
                        class="img-fluid"
                        src="https://s3img.vcdn.vn/123phim/2019/02/doanh-thu-captain-marvel-duoc-du-bao-ngang-ngua-wonder-woman-15502047710892.jpg"
                        alt="img-news"
                      />
                      <div class="news-title">
                        <h4>Cua lại vợ bầu phim mới hay nhất</h4>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
              <div id="menu111" class="container tab-pane fade">
                <br />
                <h3>Bình luận phim</h3>
                <div class="rating">
                  <div class="container">
                    <div class="row align-items-center">
                      <div class="col-sm-6 col-lg-6">
                        <div class="title py-3">Đánh giá phim hay nhất</div>
                        <form>
                          <div class="form-group form-hoder">
                            <input
                              type="text"
                              name="TenDanhGia"
                              ngModel
                              class="form-control"
                              placeholder="Nhập vào tên của bạn"
                            />
                          </div>

                          <div>
                            <div class="bg-warning p-1">
                              * Email không đúng định dạng
                            </div>
                          </div>
                          <div class="form-group">
                            <input
                              type="text"
                              name="EmailDanhGia"
                              ngModel
                              required
                              class="form-control"
                              placeholder="Email của bạn ?"
                            />
                          </div>

                          <div class="form-group">
                            <textarea
                              rows="5"
                              name="NoiDung"
                              ngModel
                              class="form-control"
                              placeholder="Đánh giá về bộ phim ?"
                            ></textarea>
                          </div>
                          <div class="saodanhgia">
                            <input
                              type="radio"
                              name="SaoDanhGia"
                              ngModel
                              value="5"
                              id="s1"
                            />
                            <label class="s1" for="s1">
                              ☆
                            </label>
                            <input
                              type="radio"
                              name="SaoDanhGia"
                              ngModel
                              value="4"
                              id="s2"
                            />
                            <label class="s2" for="s2">
                              ☆
                            </label>
                            <input
                              type="radio"
                              name="SaoDanhGia"
                              ngModel
                              value="3"
                              id="s3"
                            />
                            <label class="s3" for="s3">
                              ☆
                            </label>
                            <input
                              type="radio"
                              name="SaoDanhGia"
                              ngModel
                              value="2"
                              id="s4"
                            />
                            <label class="s4" for="s4">
                              ☆
                            </label>
                            <input
                              type="radio"
                              name="SaoDanhGia"
                              ngModel
                              value="1"
                              id="s5"
                            />
                            <label class="s5" for="s5">
                              ☆
                            </label>
                          </div>
                          <button type="submit" class="btn btn_danhgia">
                            Gửi đánh giá
                          </button>
                        </form>
                      </div>
                      <div class="col-sm-6 col-lg-6">
                        <div class="boxscroll"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===========================FOOTERRRRRRRRRRR========== */}
          <section class="footer">
            <div class="footer-content">
              <div class="row pt-5 text-white text-center">
                <div class="col-md-3">
                  {/* <img width="200px" class="py-5" src="http://eorrangeshop.com/wp/theme/bigshow/wp-content/uploads/2018/03/logo-footer.png"> */}
                </div>
                <div class="col-md-3">
                  <p class="big-title py-3">CHÍNH SÁCH</p>
                  <p>
                    <a href="https://www.facebook.com/profile.php?id=100009354660865">
                      Lợi ích cộng đồng
                    </a>
                  </p>
                  <p>
                    <a href="#">Chính sách bảo mật</a>
                  </p>
                  <p>
                    <a href="#">Quyền lợi thành viên</a>
                  </p>
                </div>
                <div class="col-md-3 py-3">
                  <p class="big-title py-3">ĐỐI TÁC</p>
                <img width="40px" class="mx-1" src="https://s3img.vcdn.vn/123phim/2018/09/404b8c4b80d77732e7426cdb7e24be20.png" />
                <img width="40px" class="mx-1" src="https://www.tiendauroi.com/uploads/default/original/2X/3/39f676408be655ac4058303835b25e8fd201eaf3.png" />
                </div>
                <div class="col-md-3">
                  <p class="big-title py-3">MOBILE APP</p>
                  <i href="#" class="fab fa-apple app-logo mx-2"></i>
                  <i href="#" class="fab fa-android app-logo"></i>
                </div>
              </div>
              <div class="line my-3"></div>
            </div>
            <div class="row m-auto info">
              <div class="col-md-2">
                <img class="mx-auto d-block pb-4" width="70px" src="https://vignette.wikia.nocookie.net/crossfirelegends/images/f/f3/Logo_VNG_2.png/revision/latest?cb=20170425064957&format=original&path-prefix=vi" />
              </div>
              <div class="col-md-10">
                <p class="text-white">
                  
                  {/* code này m mới tải về hả
                  uk
                  cái cũ t clone cho m đâu */}
                </p>
                <p class="a">
                  Địa chỉ: 52 Nguyễn Văn Cừ, Phường 1, Quận5 , Tp Hồ Chí
                  Minh
                </p>
                <p class="a">
                  Số ĐKKD: 033303030, cấp lần đầu ngày 01/07/2021 – Sở KHĐT TP.
                  HCM cấp
                </p>
              </div>
              <div class="fb pt-4 text-white">
                <div class="row m-auto">
                  <div class="col-md-6 m-auto fb-ifearm pb-3">
                  </div>
                  <div class="col-md-6 m-auto vetify">
                    <img class="mx-auto d-block"  width="200px" src="https://i0.wp.com/online.gov.vn/PublicImages/2015/08/27/11/20150827110756-dadangky.png" />
                  </div>
                </div>
              </div>
            </div>
          </section>
      </div>
    </div>
  );
};

export default Home;
