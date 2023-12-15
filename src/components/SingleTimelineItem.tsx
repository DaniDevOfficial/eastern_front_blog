import React from "react";
import { Flex, Box, VStack, Text } from "@chakra-ui/react";

export const SingleTimelineItem = ({ events }) => {
  return (
    <Flex align="center" justify="center">
      <Box w="2px" bg="gray.400" h="100%" />
      <VStack align="flex-start" spacing={4} ml={4}>
        {events.map((event, index) => (
          <Flex key={index} direction={index % 2 === 0 ? "row" : "row-reverse"}>
            <Box
              w="30px"
              h="30px"
              bg="teal.500"
              borderRadius="50%"
              display="flex"
              align="center"
              justify="center"
              color="white"
            >
              {index + 1}
            </Box>
            <VStack align="flex-start" spacing={2} p={4} bg="gray.100">
              <Text fontWeight="bold">{event.title}</Text>
              <Text>{event.description}</Text>
              <Text fontSize="sm" color="gray.500">
                {event.date}
              </Text>
            </VStack>
          </Flex>
        ))}
      </VStack>
    </Flex>
  );
};
