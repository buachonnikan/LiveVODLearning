import axios from "axios";
import { withRouter } from "react-router-dom";
const getCookie = cname => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return "Bearer " + c.substring(name.length, c.length);
    }
  }
  return "";
};

var axiosAuthen = axios.create({
  headers: { Authorization: getCookie("cookie") }
});

class CheckUser {
  constructor() {
    this.axiosAuthen = axiosAuthen;
  }
  static initt() {
    if (this.user == undefined) this.user = new CheckUser();
    return this.user;
  }
  checkTypeGetName(type, mustlogin) {
    return new Promise((resT, err) => {
      this.axiosAuthen
        .get("/_api/whoami")
        .then(res => {
          if (type.includes(res.data.type)) {
            resT(res.data.name);
          } else {
            window.location = "/401";
          }
        })
        .catch(e => (mustlogin ? (window.location = "/401") : null));
    });
  }
}

export default withRouter(CheckUser);
