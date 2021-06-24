import { MDBBtn, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React from 'react';
import { useState } from 'react';
import SeatMatrix from '../../../components/Seat/SeatMatrix';
import ShowCaseSeat from '../../../components/Seat/ShowCaseSeat';
import styles from './style.module.scss';
import Title from '../../../components/Title';
import Header from '../../../components/Header';
import cx from 'classnames';
import { Collapse, List } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
const { Panel } = Collapse;

const ChooseSeat = () => {
    const [seatOccupied, setSeatOccupied] = useState([10, 12, 50, 33, 28, 47])
    const [selectedSeats, setSelectedSeats] = useState([])
    const price = 90000;
    console.log('selectedSeats.length :>> ', selectedSeats.length);
    return (
        <>
            <Header />
            <MDBContainer className="mt-5">
                <MDBRow className={cx(styles.info_showtime,"mb-3")}>
                <MDBCol md="4" xs="12">
                    <img src="https://www.fullphim.net/static/5fe2d564b3fa6403ffa11d1c/60adc5d975000a6b680bfa25_poster-loki-marvel-2021.jpg"
                     alt="thumbnail" className={styles.thumbnail}
                    />
                </MDBCol>
                <MDBCol md="8" xs="12">
                    <div className={styles.descripion}>
                        <h3 className={styles.value}>MORTAL KOMBAT: CUỘC CHIẾN SINH TỬ</h3>
                        <p>Cụm rạp: <strong className={styles.value}>CGV Aeon Mall Hải Phòng</strong> </p>
                        <p>Suất chiếu: <strong className={styles.value}>18:45, 24/06/2021</strong> </p>
                        <p>Rạp: <strong className={styles.value}>Rạp Số 4</strong> </p>
                    </div>
                    </MDBCol>
                </MDBRow>

                <Title text={"Chọn ghế"}/>

                <MDBRow className="mt-4">
                    <MDBCol md="8" xs="12">
                        <ShowCaseSeat className="mx-auto" />
                        <SeatMatrix
                            numCol={8}
                            numRow={9}
                            seatOccupied={seatOccupied}
                            selectedSeats={selectedSeats}
                            onSelectedSeatsChange={selectedSeats => setSelectedSeats(selectedSeats)}
                        /></MDBCol>
                    <MDBCol md="4" xs="12">
                        <div className={styles.list_seats}>

                            <Collapse defaultActiveKey={['1']}
                                expandIconPosition={'right'}
                                expandIcon={({ isActive }) => <CaretRightOutlined className="text-white" rotate={isActive ? 90 : 0} />}
                                ghost
                            >
                                <Panel header={<span className={styles.title_selected_seats}>Ghế đã chọn</span>} key="1">
                                    <List
                                        header={
                                            <MDBRow className={styles.header_list}>
                                                <MDBCol>
                                                    Mã ghế
                                                </MDBCol>
                                                <MDBCol>
                                                    Giá
                                                </MDBCol>
                                            </MDBRow>
                                        }

                                        dataSource={selectedSeats}
                                        renderItem={item => (
                                            <List.Item>
                                                <MDBRow className="align-items-center">
                                                    <MDBCol>
                                                        <span className={styles.seat}>{item}</span>
                                                    </MDBCol>
                                                    <MDBCol>
                                                        {`${price}đ`}
                                                    </MDBCol>
                                                </MDBRow>
                                            </List.Item>
                                        )}
                                    />
                                </Panel>
                            </Collapse>

                            {/*info booking total */}
                            <MDBRow className={styles.info_total}>
                                <MDBCol>
                                    Tổng số ghế: <span className={styles.total_seat}> {selectedSeats.length}</span>
                                </MDBCol>
                                <MDBCol>
                                    Tổng tiền: <span className={styles.total_price}>{selectedSeats.length * price}đ</span>
                                </MDBCol>
                            </MDBRow>

                        </div>

                        <MDBBtn color='warning' className='w-100 mx-0 my-3'>{`Thanh toán`}</MDBBtn>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    )
}


export default ChooseSeat;