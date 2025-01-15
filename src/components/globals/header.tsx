import { Flex, Text } from "@radix-ui/themes";
import { Link } from "react-router";

export const Header = () => (
  <Flex align="center" justify="between" className="pt-3 pb-5 mb-3 ">
    <Text weight="bold" size="8" className="text-center">
      My Invoice Generator
    </Text>
    <Flex align="center" gap="4" justify="between">
      <NavLink label="Invoice" to="invoice" isFeatureReady />
      <NavLink label="Quotation" to="quotation" />
      <NavLink label="Receipt" to="receipt" />
    </Flex>
  </Flex>
);

const NavLink = ({
  to,
  label,
  isFeatureReady,
}: {
  label: string;
  to: string;
  isFeatureReady?: boolean;
}) => (
  <Link to={`/${to}`} className="relative px-5">
    {label}
    {!isFeatureReady && (
      <div className="absolute -top-5 right-0 w-auto px-4 py-1 text-[10px] text-white bg-blue-500 rounded-full">
        TBA
      </div>
    )}
  </Link>
);
