import { MDBBtn, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import React, { useEffect } from 'react';
import { useState } from 'react';
import SeatMatrix from '../../../components/Seat/SeatMatrix';
import ShowCaseSeat from '../../../components/Seat/ShowCaseSeat';
import styles from './style.module.scss';
import Title from '../../../components/Title';
import Header from '../../../components/Header';
import cx from 'classnames';
import { Collapse, List } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { layChiTietPhongVe } from '../../../redux/actions/PhongVeAction/PhongVeAction';
const { Panel } = Collapse;

const ChooseSeat = (props) => {
    const { detailBookingRoom } = useSelector(state => state.PhongVeReducer)
    const { userId } = useSelector(state => state.NguoiDungReducer)
    // console.log('userId', userId)
    const [selectedSeats, setSelectedSeats] = useState([])
    // console.log('detailBookingRoom', detailBookingRoom);
    const dispatch = useDispatch()
    const maLichChieu = props.match.params.maLichChieu
    const seatOccupied = detailBookingRoom?.showtimes?.Seats?.filter(item => item.isOrder === false)
    useEffect(() => {
        dispatch(layChiTietPhongVe(maLichChieu))
    }, [dispatch,maLichChieu])
    console.log('seatOccupied', seatOccupied);

    const price = detailBookingRoom?.showtimes?.priceTicket;
    // console.log('selectedSeats.length :>> ', selectedSeats.length);


    return (
        <>
            <Header />
            <MDBContainer className="mt-5">
                <MDBRow className={cx(styles.info_showtime, "mb-3")}>
                    <MDBCol md="4" xs="12">
                        <img src={detailBookingRoom.showtimes?.Film?.thumbnail}
                            alt="thumbnail" className={styles.thumbnail}
                        />
                    </MDBCol>
                    <MDBCol md="8" xs="12">
                        <div className={styles.descripion}>
                            <h3 className={styles.value}>{detailBookingRoom.showtimes?.Film?.name}</h3>
                            <p>Cụm rạp: <strong className={styles.value}>{detailBookingRoom.showtimes?.CinemaCluster?.name}</strong> </p>
                            <p>Suất chiếu: <strong className={styles.value}>{detailBookingRoom.showtimes?.timeStart?.split('T')[1].substr(0, 5)}, {detailBookingRoom.showtimes?.timeStart?.split('T')[0]}</strong> </p>
                            <p>Rạp: <strong className={styles.value}>{detailBookingRoom.showtimes?.Cinema?.name} </strong> </p>
                        </div>
                    </MDBCol>
                </MDBRow>

                <Title text={"Chọn ghế"} />

                <MDBRow className="mt-4">
                    <MDBCol md="8" xs="12">
                        <ShowCaseSeat className="mx-auto" />
                        <SeatMatrix
                            numCol={detailBookingRoom.showtimes?.Cinema?.col}
                            numRow={detailBookingRoom.showtimes?.Cinema?.row}
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

                        <MDBBtn onClick={() => {
                            let object = {
                                userId: userId,
                                showtimesId: maLichChieu,
                                timebooking: new Date(),
                                sumany: selectedSeats.length * price,
                                seats: selectedSeats
                            }
                            console.log('object', object);
                        }} color='warning' className='w-100 mx-0 my-3'>{`Thanh toán`}</MDBBtn>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    )
}


export default ChooseSeat;