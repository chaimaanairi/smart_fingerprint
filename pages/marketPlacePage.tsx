import MarketPlacePart from "../components/UI/marketPlace/marketPlacePart";
import BaseLayout from "../components/layout/baseLayout"

export default function MarketPlacePage() { 

  return (
    <BaseLayout>
        <MarketPlacePart />
    </BaseLayout>
  );
}

MarketPlacePage.Layout = BaseLayout;