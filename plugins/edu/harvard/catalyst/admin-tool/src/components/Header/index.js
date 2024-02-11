import {useSelector, useDispatch} from "react-redux";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Tabs, Tab } from "@mui/material";

import { Loader, Users } from "components";
import { getAllUsers, i2b2LibLoaded } from "actions";
import "./Header.scss";

//load the i2b2 plugin library
import i2b2Loader from "../../js/i2b2-loader";

export const Header = () => {
    const isI2b2LibLoaded = useSelector((state) => state.isI2b2LibLoaded );

    const dispatch = useDispatch();

    const ViewModeTypes = {
        USERS: "USERS",
        PROJECTS: "PROJECTS",
        HIVE: "HIVE"
    };
    const [selectedTab, setSelectedTab] = useState(ViewModeTypes.USERS);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
        dispatch(getAllUsers({}));
    };

    const updateI2b2LibLoaded = () => {
        dispatch(i2b2LibLoaded({}));
    };

    useEffect(() => {
        window.addEventListener('I2B2_READY', updateI2b2LibLoaded);

        //test get all users call
        if(isI2b2LibLoaded) {
            dispatch(getAllUsers({}));
        }

    }, [isI2b2LibLoaded]);

    return (
        <div>
            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                aria-label="admin tool navigation"
            >
                <Tab value={ViewModeTypes.USERS} label="Users"/>
                <Tab value={ViewModeTypes.PROJECTS} label="Projects" />
                <Tab value={ViewModeTypes.HIVE} label="Hive Settings" />
            </Tabs>
            {selectedTab === ViewModeTypes.USERS && <Users />}
            {!isI2b2LibLoaded && <Loader />}
        </div>
    );
};

Header.propTypes = {};

