import { MDBCard, MDBCardBody, MDBCol, MDBRow } from "mdbreact";
import TitleBox from "../../components/TittleBox";
import styles from "./style.module.scss";
import React from "react";
import Chart from "~/components/Chart";
import Title from "../../components/Title";
import cx from 'classnames';
import { Button, Select, Tabs } from "antd";
import { DatePicker } from 'antd';
import { Option } from "antd/lib/mentions";
import StatsBox from "../../components/StatsBox";

const { RangePicker } = DatePicker;
const { TabPane } = Tabs;


const dataFilm = [
    {
        date: "20/6",
        total: 400000,

    },
    {
        date: "21/6",
        total: 53000000,
    },
    {
        date: "22/6",
        total: 12000000,
    },
    {
        date: "23/6",
        total: 10000000,
    },
    {
        date: "24/6",
        total: 23000000,
    }, {
        date: "20/6",
        total: 7000000,

    },
    {
        date: "21/6",
        total: 56000000,
    },
    {
        date: "22/6",
        total: 33000000,
    },
    {
        date: "23/6",
        total: 0,
    },
    {
        date: "24/6",
        total: 15000000,
    }, {
        date: "20/6",
        total: 96000000,

    },
    {
        date: "21/6",
        total: 12000000,
    },
    {
        date: "22/6",
        total: 26000000,
    },
    {
        date: "23/6",
        total: 30000000,
    },
    {
        date: "24/6",
        total: 50000000,
    }
];

const dataCluster = [
    {
        date: "20/6",
        total: 400000,

    },
    {
        date: "21/6",
        total: 53000000,
    },
    {
        date: "22/6",
        total: 12000000,
    },
    {
        date: "23/6",
        total: 10000000,
    },
    {
        date: "24/6",
        total: 23000000,
    }, {
        date: "20/6",
        total: 7000000,

    }
];




const Dashboard = () => {

    const onChangePicker = (dates) => {
        console.log('dates :>> ', dates);
    }

    const renderListFilm = (listFilm) => {
        return (
            listFilm.map((film, index) => {
                return <Option key={index} value={film.id}>{film.name}</Option>
            })
        )
    }

    const renderListCluster = (listCluster) => {
        return (
            listCluster.map((cluster, index) => {
                return <Option key={index} value={cluster.id}>{cluster.name}</Option>
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
                                    <StatsBox title="Phim sắp chiếu" value="5" />
                                </MDBCol>
                                <MDBCol md="3" xs="12" className="my-2">
                                    <StatsBox title="Phim sắp chiếu" value="5" color="success" />
                                </MDBCol>
                                <MDBCol md="3" xs="12" className="my-2">
                                    <StatsBox title="Phim sắp chiếu" value="5" color="warning" />
                                </MDBCol>
                                <MDBCol md="3" xs="12" className="my-2">
                                    <StatsBox title="Phim sắp chiếu" value="5" color="danger" />
                                </MDBCol>
                            </MDBRow>
                        </MDBCardBody>
                    </MDBCard>

                    <MDBCard className="mt-3">
                        <MDBCardBody>
                            <Title text={'Doanh thu'} className="text-primary my-4" />
                            <Tabs defaultActiveKey="1" centered>
                                <TabPane tab="Theo cụm rạp" key="1">
                                    <form>
                                        <MDBRow className="justify-content-center align-items-end mb-5">
                                            <MDBCol md="4" className="mt-3" >
                                                <label className="grey-text">
                                                    Cụm rạp
                                                </label>
                                                <Select size="large" className="w-100"  >
                                                    {renderListCluster}
                                                </Select>
                                            </MDBCol>
                                            <MDBCol md="5" className="mt-3">
                                                <label className="grey-text">
                                                    Thời gian
                                                </label>
                                                <RangePicker size="large" className="w-100" onChange={onChangePicker} />
                                            </MDBCol>
                                            <MDBCol md="2" className="mt-3">
                                                <Button size="large" className="text-white bg-success w-100">Thống kê</Button>
                                            </MDBCol>
                                        </MDBRow>
                                    </form>

                                    {dataCluster.length!==0 ? (
                                        <>
                                            <MDBRow className="justify-content-center mb-5">
                                                <MDBCol md="3" xs="12" className="mt-3">
                                                    <StatsBox title="Tổng số vé" value="5" />
                                                </MDBCol>
                                                <MDBCol md="3" xs="12" className="mt-3">
                                                    <StatsBox title="Doanh Thu" value="35.000.000đ" color="success" />
                                                </MDBCol>
                                            </MDBRow>
                                            <Chart data={dataCluster} />
                                        </>
                                    ) : null}

                                </TabPane>
                                <TabPane tab="Theo phim" key="2">
                                    <form>
                                        <MDBRow className="justify-content-center align-items-end mb-5">
                                            <MDBCol md="4" className="mt-3" >
                                                <label className="grey-text">
                                                    Phim
                                                </label>
                                                <Select size="large" className="w-100"  >
                                                    {renderListFilm}
                                                </Select>
                                            </MDBCol>
                                            <MDBCol md="5" className="mt-3">
                                                <label className="grey-text">
                                                    Thời gian
                                                </label>
                                                <RangePicker size="large" className="w-100" onChange={onChangePicker} />
                                            </MDBCol>
                                            <MDBCol md="2" className="mt-3">
                                                <Button size="large" className="text-white bg-success w-100">Thống kê</Button>
                                            </MDBCol>
                                        </MDBRow>
                                    </form>
                                    {dataFilm.length!==0 ? (
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