
import React from "react";
import styles from "./style.module.scss";
import cx from 'classnames';
import { MDBContainer, MDBRow } from "mdbreact";
import { Table } from 'antd';
import Title from "../../components/Title";

const columns = [
    { title: 'Mã GD', dataIndex: 'id', key: 'id'},
    { title: 'Phim', dataIndex: ['Showtime', 'Film','name'], key: 'name' },
    { title: 'Số tiền', dataIndex: 'sumMoney', key: 'sumMoney',responsive: ['md'] }
];

const data = [
    {
        id: "1",
        key:"1",
        timeBooking: "2021-06-25 20:15:32",
        sumMoney: "930000",
        Showtime: {
            Film: {
                name: "Tom and Jerry Tom and Jerry",
            }
        },
        Tickets: [{
            priceTicket: "3123",
            Seat: {
                symbol: "A01"
            }
        }, {
            priceTicket: "3123",
            Seat: {
                symbol: "A02"
            }
        }, {
            priceTicket: "3123",
            Seat: {
                symbol: "A03"
            }
        }]
    },
    {
        id: "2",
        key:"2",
        timeBooking: "2021-06-25 20:15:32",
        sumMoney: "930000",
        Showtime: {
            Film: {
                name: "Tom and Jerry",
            }
        },
        Tickets: [{
            priceTicket: "3123",
            Seat: {
                symbol: "A01"
            }
        }, {
            priceTicket: "3123",
            Seat: {
                symbol: "A02"
            }
        }, {
            priceTicket: "3123",
            Seat: {
                symbol: "A03"
            }
        }]
    },
    {
        id: "3",
        key:"3",
        timeBooking: "2021-06-25 20:15:32",
        sumMoney: "930000",
        Showtime: {
            Film: {
                name: "Tom and Jerry",
            }
        },
        Tickets: [{
            priceTicket: "3123",
            Seat: {
                symbol: "A01"
            }
        }, {
            priceTicket: "3123",
            Seat: {
                symbol: "A02"
            }
        }, {
            priceTicket: "3123",
            Seat: {
                symbol: "A03"
            }
        }]
    },
    {
        id: "4",
        key:"4",
        timeBooking: "2021-06-25 20:15:32",
        sumMoney: "930000",
        Showtime: {
            Film: {
                name: "Tom and Jerry",
            }
        },
        Tickets: [{
            priceTicket: "3123",
            Seat: {
                symbol: "A01"
            }
        }, {
            priceTicket: "3123",
            Seat: {
                symbol: "A02"
            }
        }, {
            priceTicket: "3123",
            Seat: {
                symbol: "A03"
            }
        }]
    },
];

const History = () => {

<<<<<<< HEAD
    
    return (
        <>
            sadsd
=======
    const renderDescriptionTransaction = (transaction) =>{
        return (
            <div className={styles.transaction_description}>
                <p>Mã giao dịch: <strong>{transaction.id}</strong></p>
                <p>Thời gian giao dịch: <strong>{transaction.timeBooking}</strong></p>
                <p>Phim: <strong>{transaction.Showtime.Film.name}</strong></p>
                <p>Thời gian chiếu: <strong>Chưa có</strong></p>
                <p>Cụm rạp: <strong>Chưa biết tên biến</strong></p>
                <p>Ghế: <strong>{transaction.Tickets.map(ticket=>{return ticket.Seat.symbol})}</strong></p>
                <p>Tổng tiền: <strong>{transaction.sumMoney}</strong></p>
            </div>
        )
    }

    return (
        <>
            <MDBContainer className={styles.wrapper}>
                <Title text={'Lịch sử'} className="mt-5 mb-4" />
                <MDBRow className="justify-content-center">
                    <Table
                        className={styles.history_table}
                        columns={columns}
                        pagination={{ position: ["bottomCenter"]}}
                        expandable={{
                            expandedRowRender: record => renderDescriptionTransaction(record),
                            expandedRowClassName:   record => record.className = styles.transaction 
                        }}
                        dataSource={data}
                    />
                </MDBRow>
            </MDBContainer>
>>>>>>> origin/styles
        </>
    )
}

export default History;