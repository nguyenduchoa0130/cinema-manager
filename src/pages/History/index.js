
import React, { useEffect } from "react";
import styles from "./style.module.scss";
import { MDBContainer, MDBRow } from "mdbreact";
import { Table } from 'antd';
import Title from "../../components/Title";
import { useDispatch, useSelector } from "react-redux";
import { layLichSuDatVe } from "../../redux/actions/HistoryAction/HistoryAction";

const columns = [
    { title: 'Mã GD', dataIndex: 'id', key: 'id' },
    { title: 'Phim', dataIndex: ['Showtime', 'Film', 'name'], key: 'name' },
    { title: 'Ngày đặt', dataIndex: ['timeBooking'], key: 'timeStart' },
    { title: 'Số tiền', dataIndex: 'sumMoney', key: 'sumMoney', responsive: ['md'] }
];


const History = () => {
    const { historyBooking } = useSelector(state => state.HistoryReducer)
    const { userId } = useSelector(state => state.NguoiDungReducer)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(layLichSuDatVe(userId))
    }, [dispatch, userId])


    const renderDescriptionTransaction = (transaction) => {
        return (
            <div className={styles.transaction_description}>
                <p>Mã giao dịch: <strong>{transaction.id}</strong></p>
                <p>Thời gian giao dịch: <strong>{transaction.timeBooking.split('T')[0]} {transaction.timeBooking.split('T')[1].substr(0, 8)} </strong></p>
                <p>Phim: <strong>{transaction.Showtime.Film.name}</strong></p>
                <p>Thời gian chiếu: <strong>{transaction.Showtime.timeStart.split('T')[0]} {transaction.Showtime.timeStart.split('T')[1].substr(0, 5)}</strong></p>
                <p>Thời gian kết thúc: <strong>{transaction.Showtime.timeEnd.split('T')[0]} {transaction.Showtime.timeEnd.split('T')[1].substr(0, 5)}</strong></p>
                <p>Cụm rạp: <strong>{transaction.Showtime.CinemaCluster.name}</strong></p>
                <p>Địa chỉ: <strong>{transaction.Showtime.CinemaCluster.address}</strong></p>
                <p>Ghế: <strong>{transaction.Tickets.map(ticket => { return `${ticket.Seat.symbol}, ` })}</strong></p>
                <p>Tổng tiền: <strong>{`${transaction.sumMoney} vnđ`}</strong></p>
            </div>
        )
    }

    console.log('historyBooking :>> ', historyBooking);
    return (
        <>
            <MDBContainer className={styles.wrapper}>
                <Title text={'Lịch sử'} className="mt-5 mb-4" />
                <MDBRow className="justify-content-center">
                    <Table
                        className={styles.history_table}
                        columns={columns}
                        pagination={{ position: ["bottomCenter"] }}
                        expandable={{
                            expandedRowRender: record => renderDescriptionTransaction(record),
                            expandedRowClassName: record => record.className = styles.transaction
                        }}
                        dataSource={historyBooking.map((item, index) => {
                            item.key = index + 1 
                            return item
                        })}
                    />
                </MDBRow>
            </MDBContainer>
        </>
    )
}

export default History;