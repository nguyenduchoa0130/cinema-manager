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
import { useDispatch, useSelector } from "react-redux";
import { layCumRap, layCumRapTheoHethong } from "../../redux/actions/QuanLyCumRapAction";
import { layDanhSachPhimDangCongChieu, layDanhSachPhimSapCongChieu } from "../../redux/actions/TrangChuAction/TrangChuAction";
import { layThongTinThongKeTheoCumRap, layThongTinThongKeTheoPhim } from "../../redux/actions/DashBoardAction/DashBoardAction";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { USERLOGIN } from "../../util/constants/settingSystem";
import { history } from "../../App";
import { layHeThongRap } from "../../redux/actions/QuanLyHeThongRapAction";

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const Dashboard = () => {
    let taiKhoanNguoiDung = '';
    let isAdmin = false;
    if (localStorage.getItem(USERLOGIN)) {
        let userLogin = JSON.parse(localStorage.getItem(USERLOGIN));
        taiKhoanNguoiDung = userLogin.email;
        isAdmin = userLogin.isAdmin;
    }
    const { listHeThongRap } = useSelector(state => state.QuanLyHeThongRapReducer)
    const { listCumRapTheoHeThong } = useSelector(state => state.QuanLyCumRapReducer)
    const { listFilmDangCongChieu, listFilmSapCongChieu } = useSelector(state => state.TrangChuReducer)
    const { listThongKeCumRap, listThongKePhim } = useSelector(state => state.DashBoardReducer)

    const [state, setState] = useState({});

    const dispatch = useDispatch()
    useEffect(() => {
        if (isAdmin === false || taiKhoanNguoiDung.trim() === '') {
            history.push('/not-admin')
        }
        dispatch(layHeThongRap())
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
    const rap_Formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            systemId: '',
        },

    })
    useEffect(() => {
        if (rap_Formik.values.systemId !== '') {
            dispatch(layCumRapTheoHethong(rap_Formik.values.systemId))
        }
    }, [dispatch, rap_Formik.values.systemId])

    const renderListFilm = () => {
        return (
            listFilmDangCongChieu.films?.map(film => {
                return <Option key={film.id} value={film.id}>{film.filmName}</Option>
            })
        )
    }

    const renderListCluster = () => {
        return (
            listCumRapTheoHeThong.clusters?.map((cluster, index) => {
                return <Option key={index} value={cluster.id}>{cluster.clusterName}</Option>
            })
        )
    }
    // eslint-disable-next-line no-unused-vars
    const renderListSystem = () => {
        return (
            listHeThongRap.systems?.map((system, index) => {
                return <Option key={index} value={system.id}>{system.systemName}</Option>
            })
        )
    }
    const onChangeCluster = (value) => {
        setState(prevState => {
            return { ...prevState, clusterId: value }
        })
        formik_cluster.values['clusterId'] = value;
    }
    const onChangeSystem = (value) => {
        setState(prevState => {
            return { ...prevState, systemId: value }
        })
        rap_Formik.values['systemId'] = value;
    }
    const onChangeFilm = (value) => {
        setState(prevState => {
            return { ...prevState, filmId: value }
        })

        formik_film.values['filmId'] = value;
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
                                            <MDBCol md="3" className="mt-3" >
                                                <label className="grey-text">
                                                    Hệ thống
                                                </label>
                                                <Select name="systemId" size="large" className="w-100" value={rap_Formik.values.systemId} onChange={onChangeSystem} >
                                                    {renderListSystem()}
                                                </Select>
                                            </MDBCol>
                                            <MDBCol md="3" className="mt-3" >
                                                <label className="grey-text">
                                                    Cụm rạp
                                                </label>
                                                <Select name="clusterId" value={state.clusterId} size="large" className="w-100" onChange={onChangeCluster} >
                                                    {renderListCluster()}
                                                </Select>
                                            </MDBCol>
                                            <MDBCol md="4" className="mt-3">
                                                <label className="grey-text">
                                                    Thời gian
                                                </label>
                                                <RangePicker size="large" className="w-100" onChange={(value, dateString) => {
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
                                    {Object.keys(listThongKeCumRap).length !== 0 ? (
                                        <>
                                            <MDBRow className="justify-content-center mb-5">
                                                <MDBCol md="5" xs="12" className="mt-3">
                                                    <StatsBox title="Tổng số vé" value={listThongKeCumRap.totalTicket || 0} />
                                                </MDBCol>
                                                <MDBCol md="5" xs="12" className="mt-3">
                                                    <StatsBox title="Doanh Thu" value={listThongKeCumRap.totalMoney || 0} color="success" />
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
                                                <Select name="filmId" size="large" className="w-100" onChange={onChangeFilm} value={state.filmId} >
                                                    {renderListFilm()}
                                                </Select>
                                            </MDBCol>
                                            <MDBCol md="5" className="mt-3">
                                                <label className="grey-text">
                                                    Thời gian
                                                </label>
                                                <RangePicker name="dateStart_End" size="large" className="w-100" onChange={(value, dateString) => {
                                                    formik_film.values.dateStart_End = dateString
                                                }} />
                                            </MDBCol>
                                            <MDBCol md="2" className="mt-3">
                                                <Button onClick={() => {
                                                    dispatch(layThongTinThongKeTheoPhim(formik_film.values.filmId, formik_film.values.dateStart_End))
                                                }} size="large" className="text-white bg-success w-100">Thống kê</Button>
                                            </MDBCol>
                                        </MDBRow>
                                    </form>
                                    {Object.keys(listThongKePhim).length !== 0 ? (
                                        <>
                                            <MDBRow className="justify-content-center mb-5">
                                                <MDBCol md="5" xs="12" className="mt-3">
                                                    <StatsBox title="Tổng số vé" value={listThongKePhim.totalTicket || 0} />
                                                </MDBCol>
                                                <MDBCol md="5" xs="12" className="mt-3">
                                                    <StatsBox title="Doanh Thu" value={listThongKePhim.totalMoney || 0} color="success" />
                                                </MDBCol>
                                            </MDBRow>
                                            <Chart data={listThongKePhim.details} />
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