import WhoAreWe from "../../Pages/WhoAreYou/WhoAreWe";
import WeDo from "../../Pages/WeDo/WeDo";
import OurClients from "../../Pages/OurClients/OurClients";
import Call from "../../Pages/Call/Call";
import { FC } from "react";

export interface ComponentsInterface {
  id: number;
  component: FC;
  title: string;
  route?: string;
}

const components: ComponentsInterface[] = [
  { id: 0, component: WhoAreWe, title: "КТО МЫ", route: "kto_mi" },
  { id: 1, component: WeDo, title: "МЫ ДЕЛАЕМ", route: "mi_delayem" },
  {
    id: 2,
    component: OurClients,
    title: "НАШИ КЛИЕНТЫ",
    route: "nashi_klienti",
  },
  {
    id: 3,
    component: Call,
    title: "СВЯЖИТЕСЬ С НАМИ",
    route: "svyazhitec_s_nami",
  },
];

export default components;
