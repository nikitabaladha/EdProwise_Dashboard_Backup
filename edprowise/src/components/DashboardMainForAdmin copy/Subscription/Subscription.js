import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import getAPI from "../../../api/getAPI";

import SubscriptionTable from "./SubscriptionTable.js";
import AddNewSubscription from "./AddNewSubscription/AddNewSubscription.js";
import ViewSubscription from "./ViewSubscription/ViewSubscription.js";
import UpdateSubscription from "./UpdateSubscription/UpdateSubscription.js";

const Subscription = () => {
  const [schools, setSchools] = useState([]);
  const [subscription, setSubscription] = useState([]);
  const [selectedSubscription, setSelectedsubscription] = useState(null);

  const location = useLocation();
  const isCreateRoute =
    location.pathname ===
    "/admin-dashboard/subscriptions/add-new-subscriptions";
  const isViewRoute =
    location.pathname === "/admin-dashboard/subscriptions/view-subscriptions";
  const isUpdateRoute =
    location.pathname === "/admin-dashboard/subscriptions/update-subscriptions";

  const fetchSchoolData = async () => {
    try {
      const response = await getAPI(`/school`, {}, true);
      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setSchools(response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching School List:", err);
    }
  };

  const fetchSubscriptionData = async () => {
    try {
      const response = await getAPI(`/subscription`, {}, true);
      if (
        !response.hasError &&
        response.data &&
        Array.isArray(response.data.data)
      ) {
        setSubscription(response.data.data);
        console.log("Subscription main page data fetch", response.data.data);
      } else {
        console.error("Invalid response format or error in response");
      }
    } catch (err) {
      console.error("Error fetching School List:", err);
    }
  };

  useEffect(() => {
    fetchSchoolData();
    fetchSubscriptionData();
  }, []);

  const addSubscription = (newSubscription) => {
    setSubscription((prevSubscription) => [
      ...prevSubscription,
      newSubscription,
    ]);
  };

  const updatedSubscription = (newUpdatedSubscription) => {
    setSubscription((prevSubscription) =>
      prevSubscription.map((subscription) =>
        subscription.id === newUpdatedSubscription.id
          ? newUpdatedSubscription
          : subscription
      )
    );
  };

  return (
    <>
      {isCreateRoute ? (
        <AddNewSubscription
          addSubscription={addSubscription}
          schools={schools}
        />
      ) : isViewRoute ? (
        <ViewSubscription subscription={subscription} />
      ) : isUpdateRoute ? (
        <UpdateSubscription
          subscription={subscription}
          updatedSubscription={updatedSubscription}
          schools={schools}
        />
      ) : (
        <SubscriptionTable
          schools={schools}
          setSchools={setSchools}
          subscription={subscription}
          setSubscription={setSubscription}
          selectedSubscription={selectedSubscription}
          setSelectedsubscription={setSelectedsubscription}
        />
      )}
    </>
  );
};

export default Subscription;
