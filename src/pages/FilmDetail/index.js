
import React,{ useState} from "react";
import styles from "./style.module.scss";
import cx from 'classnames';
import { MDBBtn, MDBCol, MDBContainer, MDBModal, MDBRow } from "mdbreact";

const FilmDetail = () => {
    const [isShowing,setShowing] =useState(false);
    const toggle = () =>{
        setShowing(!isShowing);
    }

    const film = {
        filmName: "Bossam: Đánh Cắp Số Phận ",
        country: "Korean",
        releaseYear: "",
        duration: "2021",
        actors: "Kwon Suk Jang",
        categoryId:  "Võ thuật",
        director: " Jung Il Woo, Kwon Yoo Ri, Shin Hyun Soo",
        status: "Đang công chiếu",
        trailer:"https://www.youtube.com/embed/zDnNEnOAl7o",
        desc: "Chuyện phim Bossam: Đánh Cắp Số Phận lấy bối cảnh ở thời Vua Gwang Hae, xoay quanh cuộc sống của hai nhân vật Ba Woo (Jung Il Woo thủ vai) và công chúa Soo Kyung (Kwon Yoo Ri đảm nhận). Trong đó Ba Woo là người chuyên thực hiện việc kết nối những phụ nữ không có ý định lấy chồng mới hay nói cách khác là góa phụ, nhưng anh vô tình bắt cóc phải công chúa Soo Kyung. Anh ta bị đóng khung cho âm mưu của của ai đó và lựa chọn sống trong vỏ bọc của một kẻ thấp hèn dù rất muốn thoát khỏi nó.",
        poster: "https://www.fullphim.net//static/5fe2d564b3fa6403ffa11d1c/60acb62be8687a52cfd3115b_hung-than-trang-1.jpg",
        thumbnail: "https://www.fullphim.net/static/5fe2d564b3fa6403ffa11d1c/607eacb95464f47aa43bf101_poster-bossam-danh-cap-so-phan.jpg"
    }
    return (
        <>
        <div className={styles.wrapper_template}>
            <div style={{
                backgroundImage: `url(${(film.poster) || "../public/book.png"})`
            }}
                className={styles.dynamic_page_header}
            >
                <div className={styles.dynamic_header_overlay}>
                    <div className="container">
                        <div className={styles.header_content}>
                            <MDBRow className="justify-content-between">
                                <MDBCol sm="12" md="4">
                                    <div style={{
                                        backgroundImage: `url(${(film.thumbnail) || "../public/book.png"})`
                                    }}
                                        className={styles.header_thumbnail}
                                    >
                                    </div>
                                </MDBCol>
                                <MDBCol sm="12" md="7">
                                    <div className={styles.header_info}>
                                        <h1 className={cx(styles.header_title,"display-4")}>
                                            {film.filmName}
                                        </h1>
                                        <div className={styles.header_short_descriptiop}>
                                            <p><strong>Quốc gia :</strong> {film.country}</p>
                                            <p><strong>Năm xuất bản:</strong> {film.releaseYear}</p>
                                            <p><strong>Diển viên:</strong> {film.actors}</p>
                                            <p><strong>Đạo diển:</strong> {film.director}</p>
                                            <p><strong>Thể loại:</strong> {film.categoryId}</p>
                                            <p><strong>Thời lượng:</strong> {film.duration}</p>
                                            <p><strong>Trạng thái:</strong> {film.status}</p>
                                        </div>
                                        <div className="header_btn_group">
                                            <MDBBtn color="primary" onClick={toggle}>Trailer</MDBBtn>
                                            <MDBBtn color="danger">Đặt vé</MDBBtn>
                                        </div>

                                    </div>

                                </MDBCol>
                            </MDBRow>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={styles.descripion_film}>
                <MDBContainer>
                    <h1>Nội dung phim</h1>
                    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora in voluptate voluptatem laudantium, id sit incidunt quidem quae dignissimos ducimus distinctio aperiam corrupti sequi nulla quos, mollitia nam explicabo velit. Unde sunt facere quam enim tempora natus odit aperiam, architecto ea dolore quibusdam ad maiores exercitationem voluptas aspernatur veritatis, ducimus eligendi recusandae nesciunt. Quos harum voluptas vero consequatur a tempore iste odio tempora rerum? Et rem fugit dolorum! Odio velit a, vitae quo cupiditate vero blanditiis reiciendis in consequuntur quos?</p>
                    <iframe width="100%" height="500px" src={film.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </MDBContainer>
            </div>
        </div>
        <MDBModal className={styles.detailModal} size="lg" isOpen={isShowing} toggle={toggle} centered>
            <iframe width="100%" height="500px" src={film.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </MDBModal>
        </>

    );
};
export default FilmDetail;