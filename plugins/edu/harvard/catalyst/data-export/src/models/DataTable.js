import PropTypes from "prop-types";
import {StatusInfo} from "./StatusInfo";

export const DataTable = ({
  table = {},
  isFetching= false,
  statusInfo = StatusInfo()
} = {}) => ({
    table,
    isFetching,
    statusInfo
});

DataTable.propTypes = {
    table: PropTypes.object,
    isFetching: PropTypes.bool,
    statusInfo: PropTypes.shape(StatusInfo),
};
