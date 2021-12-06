import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

export default withStyles({
  root: {
    // boxSizing: "border-box",
    padding: ".35rem 1.9rem",
    borderRadius: "0",
    backgroundSize: "100% 205%",
    backgroundOrigin: "padding",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 100%",
    backgroundImage: "linear-gradient(to bottom, #3E2F72 50%, transparent 50%)",
    border: "3px solid #3E2F71",
    transition: ".2s",
    "&:hover": {
      backgroundPosition: "center 0",
      color: "#FFFFFF",
    },
  },
})(Button);
