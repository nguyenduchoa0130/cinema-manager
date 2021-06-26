import { MDBCard, MDBCardBody, MDBCol, MDBRow } from "mdbreact";
import TitleBox from "../../components/TittleBox";
import styles from "./style.module.scss";
import React, { useEffect, useState } from "react";
import Chart from "../../components/Chart";
import Title from "../../components/Title";
import cx from 'classnames';
import { Button, Select, Tabs } from "antd";
import { DatePicker } from 'antd';
import { Option } from "antd/lib/mentions";
import StatsBox from "../../components/StatsBox";
import { numberWithCommas } from "../../util";
import { useDispatch, useSelector } from "react-redux";
import { layCumRap } from "../../redux/actions/QuanLyCumRapAction";
import { layDanhSachPhimDangCongChieu, layDanhSachPhimSapCongChieu } from "../../redux/actions/TrangChuAction/TrangChuAction";
import { layThongTinThongKeTheoCumRap, layThongTinThongKeTheoPhim } from "../../redux/actions/DashBoardAction/DashBoardAction";
import { useFormik } from 'formik';
import * as Yup from 'yup'

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const Dashboard = () => {

    const { listCumRap } = useSelector(state => state.QuanLyCumRapReducer)
    const { listFilmDangCongChieu, listFilmSapCongChieu } = useSelector(state => state.TrangChuReducer)
    const { listThongKeCumRap, listThongKePhim } = useSelector(state => state.DashBoardReducer)
    
    console.log(listThongKeCumRap);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(layCumRap())
        dispatch(layDanhSachPhimDangCongChieu())
        dispatch(layDanhSachPhimSapCongChieu()) 
    }, [])


    const formik_cluster = useFormik({
        initialValues: {
            clusterId: "",
            dateStart_End: []
        },
        validationSchema: Yup.object().shape({
            clusterId: Yup.string().required("Required!"),
        }),
        onSubmit: values => {
            dispatch(layThongTinThongKeTheoCumRap(values))
        }
    })
    const formik_film = useFormik({
        initialValues: {
            filmId: "",
            dateStart_End: [],
        },
        validationSchema: Yup.object().shape({
            filmId: Yup.string().required("Required!"),
        }),
        onSubmit: values => {
            dispatch(layThongTinThongKeTheoPhim(values.filmId, values.dateStart_End))
        }
    })

    const dataFilm = [
        {
            date: "20/6",
            sumMoney: 400000,
            numOfTickets: 2000

        },
        {
            date: "21/6",
            sumMoney: 53000000,
            numOfTickets: 3000
        },
        {
            date: "22/6",
            sumMoney: 12000000,
            numOfTickets: 4263
        },
        {
            date: "23/6",
            sumMoney: 10000000,
            numOfTickets: 1204
        },
        {
            date: "24/6",
            sumMoney: 23000000,
            numOfTickets: 1452
        }, {
            date: "20/6",
            sumMoney: 7000000,
            numOfTickets: 2025

        }
    ];


    const onChangePicker = (dates) => {
        console.log('dates :>> ', dates);
    }

    const renderListFilm = () => {
        return (
            listFilmDangCongChieu.films?.map((film, index) => {
                return <option key={index} value={film.id}>{film.filmName}</option>
            })
        )
    }

    const renderListCluster = () => {
        return (
            listCumRap.clusters?.map((cluster, index) => {
                return <option key={index} value={cluster.id}>{cluster.clusterName}</option>
            })
        )
    }

    return (
        <>
            <TitleBox text="Thống kê" />
            <MDBRow>
                <MDBCol>
                    <MDBCard>
                        <MDBCardBody>
                            <MDBRow className={cx(styles.short_info, "justify-content-center")}>
                                <MDBCol md="3" xs="12" className="my-2">
                                    <StatsBox title="Phim sắp chiếu" value={listFilmSapCongChieu.films?.length} />
                                </MDBCol>
                                <MDBCol md="3" xs="12" className="my-2">
                                    <StatsBox title="Phim đang chiếu" value={listFilmDangCongChieu.films?.length} color="success" />
                                </MDBCol>
                                {/* <MDBCol md="3" xs="12" className="my-2">
                                    <StatsBox title="Phim sắp chiếu" value="5" color="warning" />
                                </MDBCol>
                                <MDBCol md="3" xs="12" className="my-2">
                                    <StatsBox title="Phim sắp chiếu" value="5" color="danger" />
                                </MDBCol> */}
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>

                    <MDBCard className="mt-3">
                        <MDBCardBody>
                            <Title text={'Doanh thu'} className="text-primary my-4" />
                            <Tabs defaultActiveKey="1" centered>
                                <TabPane tab="Theo cụm rạp" key="1">
                                    <form onSubmit={formik_cluster.handleSubmit}>
                                        <MDBRow className="justify-content-center align-items-end mb-5">
                                            <MDBCol md="4" className="mt-3" >
                                                <label className="grey-text">
                                                    Cụm rạp
                                                </label>
                                                <select name="clusterId" value={formik_cluster.values['clusterId']} size="large" className="w-100" onChange={formik_cluster.handleChange} >
                                                    {renderListCluster()}
                                                </select>
                                            </MDBCol>
                                            <MDBCol md="5" className="mt-3">
                                                <label className="grey-text">
                                                    Thời gian
                                                </label>
                                                <RangePicker size="large" className="w-100" onChange={(value, dateString) => {
                                                    // console.log('dateString',dateString);
                                                    formik_cluster.values.dateStart_End = dateString
                                                }} />
                                            </MDBCol>
                                            <MDBCol md="2" className="mt-3">
                                                <Button onClick={() => {
                                                    dispatch(layThongTinThongKeTheoCumRap(formik_cluster.values.clusterId, formik_cluster.values.dateStart_End))
                                                }} size="large" className="text-white bg-success w-100">Thống kê</Button>
                                            </MDBCol>
                                        </MDBRow>
                                    </form>

                                    {listThongKeCumRap.details?.length !== 0 ? (
                                        <>
                                            <MDBRow className="justify-content-center mb-5">
                                                <MDBCol md="3" xs="12" className="mt-3">
                                                    <StatsBox title="Tổng số vé" value={(listThongKeCumRap.totalTicket)} />
                                                </MDBCol>
                                                <MDBCol md="3" xs="12" className="mt-3">
                                                    <StatsBox title="Doanh Thu" value={`${listThongKeCumRap.totalMoney}đ`} color="success" />
                                                </MDBCol>
                                            </MDBRow>
                                            <Chart data={listThongKeCumRap.details} />
                                        </>
                                    ) : null}

                                </TabPane>
                                <TabPane tab="Theo phim" key="2">
                                    <form onSubmit={formik_film.handleSubmit}>
                                        <MDBRow className="justify-content-center align-items-end mb-5">
                                            <MDBCol md="4" className="mt-3" >
                                                <label className="grey-text">
                                                    Phim
                                                </label>
                                                <Select name="filmId" size="large" className="w-100" onChange={formik_film.handleChange} >
                                                    {renderListFilm()}
                                                </Select>
                                            </MDBCol>
                                            <MDBCol md="5" className="mt-3">
                                                <label className="grey-text">
                                                    Thời gian
                                                </label>
                                                <RangePicker name="dateStart_End" size="large" className="w-100" onChange={(value, dateString) => {
                                                    // console.log('dateString',dateString);
                                                    formik_cluster.values.dateStart_End = dateString
                                                }} />
                                            </MDBCol>
                                            <MDBCol md="2" className="mt-3">
                                                <Button size="large" className="text-white bg-success w-100">Thống kê</Button>
                                            </MDBCol>
                                        </MDBRow>
                                    </form>
                                    {dataFilm.length !== 0 ? (
                                        <>
                                            <MDBRow className="justify-content-center mb-5">
                                                <MDBCol md="3" xs="12" className="mt-3">
                                                    <StatsBox title="Tổng số vé" value="5" />
                                                </MDBCol>
                                                <MDBCol md="3" xs="12" className="mt-3">
                                                    <StatsBox title="Doanh Thu" value="50.000.000đ" color="success" />
                                                </MDBCol>
                                            </MDBRow>
                                            <Chart data={dataFilm} />
                                        </>
                                    ) : null}
                                </TabPane>
                            </Tabs>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </>
    )
}

export default Dashboard;