

import Transform from "layouts/transform";

// @mui icons
import SwapHorizontalCircleOutlinedIcon from '@mui/icons-material/SwapHorizontalCircleOutlined';

const routes = [
  {
    type: "collapse",
    name: "TransformX",
    key: "transform-dashboard",
    icon: <SwapHorizontalCircleOutlinedIcon />,
    route: "/transform-dashboard",
    component: <Transform />,
  }
];

export default routes;
