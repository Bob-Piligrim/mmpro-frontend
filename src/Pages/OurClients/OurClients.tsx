import React from "react";
import "./OurClients.css";

import client1 from "../../Assets/About/client1.png";
import client2 from "../../Assets/About/client2.png";
import client3 from "../../Assets/About/client3.png";
import client4 from "../../Assets/About/client4.png";
import client5 from "../../Assets/About/client5.png";
import client6 from "../../Assets/About/client6.png";
import client7 from "../../Assets/About/client7.png";
import client8 from "../../Assets/About/client8.png";
import client9 from "../../Assets/About/client9.png";
import client10 from "../../Assets/About/client10.png";
import client11 from "../../Assets/About/client11.png";
import client12 from "../../Assets/About/client12.png";
import client13 from "../../Assets/About/client13.png";
import client14 from "../../Assets/About/client14.png";
import client15 from "../../Assets/About/client15.png";
import client16 from "../../Assets/About/client16.png";
import client17 from "../../Assets/About/client17.png";
import client18 from "../../Assets/About/client18.png";

const OurClients: React.FC = () => {
  return (
    <>
      <div className="clients">
        <div>
          <img src={client1} alt="клиент1" />
          <img src={client2} alt="клиент2" />
          <img src={client3} alt="клиент3" />
          <img src={client4} alt="клиент4" />
          <img src={client5} alt="клиент5" />
          <img src={client6} alt="клиент6" />
        </div>
        <div>
          <img src={client7} alt="клиент7" />
          <img src={client8} alt="клиент8" />
          <img src={client9} alt="клиент9" />
          <img src={client10} alt="клиент10" />
          <img src={client11} alt="клиент11" />
          <img src={client12} alt="клиент12" />
        </div>
        <div>
          <img src={client13} alt="клиент13" />
          <img src={client14} alt="клиент14" />
          <img src={client15} alt="клиент15" />
          <img src={client16} alt="клиент16" />
          <img src={client17} alt="клиент17" />
          <img src={client18} alt="клиент18" />
        </div>
      </div>
      <div className="clients-mobile">
        <div>
          <img src={client1} alt="клиент1" />
          <img src={client7} alt="клиент7" />
          <img src={client13} alt="клиент13" />
          <img src={client3} alt="клиент3" />
          <img src={client9} alt="клиент9" />
          <img src={client15} alt="клиент15" />
          <img src={client5} alt="клиент5" />
          <img src={client11} alt="клиент11" />
          <img src={client17} alt="клиент17" />
        </div>
        <div>
          <img src={client2} alt="клиент2" />
          <img src={client8} alt="клиент8" />
          <img src={client14} alt="клиент14" />
          <img src={client4} alt="клиент4" />
          <img src={client10} alt="клиент10" />
          <img src={client16} alt="клиент16" />
          <img src={client6} alt="клиент6" />
          <img src={client12} alt="клиент12" />
          <img src={client18} alt="клиент18" />
        </div>
      </div>
    </>
  );
};

export default OurClients;
