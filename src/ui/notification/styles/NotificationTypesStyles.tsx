import NotificationType from "../interfaces/NotificationType"
import CancelIcon from "@public/core/CancelIcon";
import AcceptIcon from "@public/core/AcceptIcon";
import InfoIcon from "@public/core/InfoIcon";
import WarningIcon from "@public/core/WarningIcon";
import Spin from "@ui/core/components/Spin";

const NotificationStyles = new Map([
  [NotificationType.ERROR, { firstColor: "#FDF1F5", secondColor: "#F47777", textColor: "#613636", icon: <CancelIcon /> }],
  [NotificationType.INFO, { firstColor: "#F0FAFC", secondColor: "#38BBFE", textColor: "#365961", icon: <InfoIcon />  } ],
  [NotificationType.INPROCCESS, { firstColor: "#F0FAFC", secondColor: "#38BBFE", textColor: "#365961", icon: <Spin size={12} className="!me-1" />  } ],
  [NotificationType.OK, { firstColor: "#EEFBF2", secondColor: "#35B783", textColor: "#366143", icon: <AcceptIcon />  } ],
  [NotificationType.WARNING, { firstColor: "#FFF9EB", secondColor: "#FCC437", textColor: "#855F10", icon: <WarningIcon />  } ]
])

export default NotificationStyles
