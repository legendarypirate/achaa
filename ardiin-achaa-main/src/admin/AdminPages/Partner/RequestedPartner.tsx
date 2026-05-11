// @ts-nocheck
import React, { useEffect, useState } from "react";
import moment from "moment";
import Axios from "../../../Axios";
import Table from "../../AdminTools/Table/Table";
import { Tab, TabContainer, TabPanel, Tabs } from "../../../tools/Tabs/Tabs";
import CrossRoadTable from "./CrossRoadTable";
import TransPimpModal from "./Modals/TransPimpModal";
import ContainerTransModal from "./Modals/ContainerTransModal";
import TrainTransModal from "./Modals/TrainTransModal";
import OnlineShopModal from "./Modals/OnlineShopModal";
import AirTransModal from "./Modals/AirTransModal";

const RequestedPartner = () => {
  const [id, setID] = useState(0);

  const [pimpModalVisible, setPimpModalVisible] = useState(false);
  const [containerModalVisible, setContainerModalVisible] = useState(false);
  const [trainModalVisible, setTrainModalVisible] = useState(false);
  const [onlineModalVisible, setOnlineModalVisible] = useState(false);
  const [airModalVisible, setAirModalVisible] = useState(false);

  const [activeTab, setActiveTab] = useState(1);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    Axios.get("/partner/getExpressType").then((res) => {
      setTypes(res.data);
    });
  }, []);

  const column = [
    {
      Header: "Компанийн нэр",
      accessor: "name",
      Cell: ({ value }) => (!value || value === "0" ? "Хувь хүн" : value),
    },
    {
      Header: "Утас",
      accessor: "phone",
      Cell: ({ value }) => (!value || value === 0 ? "---" : value),
    },
    {
      Header: "Цахим шуудан",
      accessor: "email",
      Cell: ({ value }) => (!value || value === "0" ? "---" : value),
    },
    {
      Header: "Бүртгэгдсэн огноо",
      accessor: "signed_date",
      Cell: ({ value }) => moment(value).format("YYYY/MM/DD"),
    },
  ];

  const hangleChange = (e, value) => {
    setActiveTab(value);
  };

  const modalOnCancel = (expressTypeID) => {
    setID("");

    switch (expressTypeID) {
      case 1:
        return setPimpModalVisible(false);
      case 2:
        return setContainerModalVisible(false);
      case 3:
        return setTrainModalVisible(false);
      case 4:
        return setOnlineModalVisible(false);
      case 5:
        return setAirModalVisible(false);
      default:
        return setPimpModalVisible(false);
    }
  };

  const renderTab = () => {
    let tab = null;

    if (types.length) {
      tab = types.map((item, index) => {
        return <Tab key={index} title={item.express_type} value={item.id} />;
      });

      tab.push(<Tab key={99} title="Улс, хот хоорондын" value={99} />);
    }

    return tab;
  };

  const renderTabPanel = () => {
    return types.map((item, index) => {
      let modalVisible = null;
      switch (item.id) {
        case 1:
          modalVisible = setPimpModalVisible;
          break;
        case 2:
          modalVisible = setContainerModalVisible;
          break;
        case 3:
          modalVisible = setTrainModalVisible;
          break;
        case 4:
          modalVisible = setOnlineModalVisible;
          break;
        case 5:
          modalVisible = setAirModalVisible;
          break;
        default:
          modalVisible = null;
      }

      return (
        <TabPanel key={index} selectedTab={activeTab} value={item.id}>
          <Table
            mainAxios="/partner"
            axiosURL={`/partner/requested/${item.id}`}
            columns={column}
            setID={setID}
            showModalHandler={modalVisible}
            disablePhoto
            disableAddBtn
            // enablePartnerConfirm
          />
        </TabPanel>
      );
    });
  };

  return (
    <TabContainer>
      <TransPimpModal
        id={id}
        visible={pimpModalVisible}
        onCancel={() => modalOnCancel(1)}
      />
      <ContainerTransModal
        id={id}
        visible={containerModalVisible}
        onCancel={() => modalOnCancel(2)}
      />
      <TrainTransModal
        id={id}
        visible={trainModalVisible}
        onCancel={() => modalOnCancel(3)}
      />
      <OnlineShopModal
        id={id}
        visible={onlineModalVisible}
        onCancel={() => modalOnCancel(4)}
      />
      <AirTransModal
        id={id}
        visible={airModalVisible}
        onCancel={() => modalOnCancel(5)}
      />

      <Tabs selectedTab={activeTab} onChange={hangleChange}>
        {renderTab()}
      </Tabs>

      {renderTabPanel()}

      <TabPanel selectedTab={activeTab} value={99}>
        <CrossRoadTable />
      </TabPanel>
    </TabContainer>
  );
};

export default RequestedPartner;
