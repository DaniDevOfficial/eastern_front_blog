import React, { useEffect } from "react";
import {
  Box,
  chakra,
  Container,
  Text,
  HStack,
  VStack,
  Flex,
  useColorModeValue,
  useBreakpointValue,
  Link as ChakraLink,
  Icon,
  Button,
  useToken,
  Heading,
  Link,
  Tooltip,
} from "@chakra-ui/react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { getAllTimelineItems } from "../repo/repo";
import { TimelineItem } from "../types/Timeline";
import { Utils } from "../dateUtils";
import { useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "@chakra-ui/icons";

export const Timeline = () => {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const isDesktop = useBreakpointValue({ base: false, md: true });
  const [timelineItems, setTimelineItems] = React.useState<TimelineItem[]>([]);

  useEffect(() => {
    getAllTimelineItems()
      .then((items) => {
        items.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA.getTime() - dateB.getTime();
        });
        setTimelineItems(items);
        console.log(items);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container maxWidth="7xl" p={{ base: 2, sm: 10 }}>
      <HStack
        color={"white"}
        align={"center"}
        cursor={"pointer"}
        onClick={() => navigate(-1)}
      >
        <Icon aria-label="Zurück" as={ArrowBackIcon} />
        <Text variant={"ghost"}>Zurück</Text>
      </HStack>
      <Heading fontSize="4xl" mb={18} textAlign="center">
        Timeline
      </Heading>
      {timelineItems.map((timelineItem, index) => (
        <Flex key={timelineItem.id} mb="10px">
          {isDesktop && (index + 1) % 2 === 0 && (
            <>
              <EmptyCard />
              <LineWithDot />
              <Card isLeft={true} {...timelineItem} index={index} />
            </>
          )}

          {/* Mobile view */}
          {isMobile && (
            <>
              <LineWithDot />
              <Card {...timelineItem} index={index} />
            </>
          )}

          {/* Desktop view(right card) */}
          {isDesktop && (index + 1) % 2 !== 0 && (
            <>
              <Card isLeft={false} {...timelineItem} index={index} />

              <LineWithDot />
              <EmptyCard />
            </>
          )}
        </Flex>
      ))}
    </Container>
  );
};

interface CardProps {
  index: number;
  id: string;
  title: string;
  description: string;
  date: Date;
  link: string;
  readat: string;
  isLeft?: boolean;
}

const Card = ({
  index,
  title,
  description,
  date,
  link,
  readat,
  isLeft,
}: CardProps) => {
  const [displayDate, setDisplayDate] = React.useState<string>(
    Utils.formatTimelineDate(date)
  );
  const [bg] = useToken("colors", ["bg-highlight.base"]);

  useEffect(() => {
    setDisplayDate(Utils.formatTimelineDate(date));
  }, [date]);

  let borderWidthValue = isLeft ? "15px 15px 15px 0" : "15px 0 15px 15px";
  let leftValue = isLeft ? "-15px" : "unset";
  let rightValue = isLeft ? "unset" : "-15px";

  const isMobile = useBreakpointValue({ base: true, lg: false });
  if (isMobile) {
    leftValue = "-15px";
    rightValue = "unset";
    borderWidthValue = "15px 15px 15px 0";
  }
  const openLink = (link: URL) => {
    alert(link);
    window.open(link, "_blank");
  };
  return (
    <HStack
      flex={1}
      p={{ base: 3, sm: 6 }}
      bg={"bg-highlight.base"}
      spacing={5}
      rounded="lg"
      alignItems="center"
      pos="relative"
      _before={{
        content: `""`,
        w: "0",
        h: "0",
        borderColor: `transparent ${bg} transparent`,
        borderStyle: "solid",
        borderWidth: borderWidthValue,
        position: "absolute",
        left: leftValue,
        right: rightValue,
        display: "block",
      }}
    >
      <Box>
        <Text fontSize="lg" color="accent.base">
          {displayDate}
        </Text>

        <VStack spacing={2} mb={3} textAlign="left">
          <Heading size={"sm"} w="100%">
            {title}
          </Heading>
          <Text fontSize="md">
            {description}
            <Tooltip
              label={
                <Text>
                  Zitat von {new URL(link).host}. Besucht am{" "}
                  {Utils.formatTimelineDate(new Date(readat))}
                </Text>
              }
            >
              <Link display={"inline"} href={link}>
                <sup>[{index + 1}]</sup>
              </Link>
            </Tooltip>
          </Text>
        </VStack>
        <Button
          variant="outline"
          display="flex"
          alignItems="center"
          as={ChakraLink}
          onClick={() => openLink(new URL(link))}
        >
          Mehr lesen
          <Icon as={AiOutlineArrowRight} boxSize={4} ml={1} />
        </Button>
      </Box>
    </HStack>
  );
};

const LineWithDot = () => {
  return (
    <Flex
      pos="relative"
      alignItems="center"
      mr={{ base: "40px", md: "40px" }}
      ml={{ base: "0", md: "40px" }}
    >
      <chakra.span
        position="absolute"
        left="50%"
        height="calc(100% + 10px)"
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        top="0px"
      ></chakra.span>
      <Box pos="relative" p="10px">
        <Box
          pos="absolute"
          top="0"
          left="0"
          bottom="0"
          right="0"
          width="100%"
          height="100%"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="center center"
          bg={useColorModeValue("gray.600", "gray.200")}
          borderRadius="100px"
          backgroundImage="none"
          opacity={1}
        ></Box>
      </Box>
    </Flex>
  );
};

const EmptyCard = () => {
  return (
    <Box
      flex={{ base: 0, md: 1 }}
      p={{ base: 0, md: 6 }}
      bg="transparent"
    ></Box>
  );
};
