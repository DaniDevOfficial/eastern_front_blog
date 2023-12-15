import React, { useEffect } from 'react';
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

} from '@chakra-ui/react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { getAllTimelineItems } from '../repo/repo';
import { TimelineItem } from '../types/Timeline';

export const Timeline = () => {
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
            console.log(items)
        })
          .catch((error) => {
            console.error(error);
          });
      }, []);

    return (
        <Container maxWidth="7xl" p={{ base: 2, sm: 10 }}>
            <chakra.h3 fontSize="4xl" fontWeight="bold" mb={18} textAlign="center">
                Timeline 
            </chakra.h3>
            {timelineItems.map((timelineItem, index) => (
                <Flex key={timelineItem.id} mb="10px">
                    {isDesktop && (index + 1) % 2 === 0 && (
                        <>
                            <EmptyCard />
                            <LineWithDot />
                            <Card isLeft={true} {...timelineItem} />
                        </>
                    )}

                    {/* Mobile view */}
                    {isMobile && (
                        <>
                            <LineWithDot />
                            <Card {...timelineItem} />
                        </>
                    )}

                    {/* Desktop view(right card) */}
                    {isDesktop && (index + 1) % 2 !== 0 && (
                        <>
                            <Card isLeft={false} {...timelineItem} />

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
    id: string;
    title: string;
    description: string;
    date: string;
    link: string;
    isLeft?: boolean;
}

function findIndexById(array: any[], id: string ) {
    return array.findIndex(item => item.id === id);
}

const Card = ({ id, title, description, date, link, isLeft }: CardProps) => {


    let borderWidthValue = isLeft ? '15px 15px 15px 0' : '15px 0 15px 15px';
    let leftValue = isLeft ? '-15px' : 'unset';
    let rightValue = isLeft ? 'unset' : '-15px';

    const isMobile = useBreakpointValue({ base: true, md: false });
    if (isMobile) {
        leftValue = '-15px';
        rightValue = 'unset';
        borderWidthValue = '15px 15px 15px 0';
    }
    const openLink = (link: URL) => {
        alert(link);
        window.open(link, '_blank');
    }
    return (
        <HStack
            flex={1}
            p={{ base: 3, sm: 6 }}
            bg={useColorModeValue('gray.100', 'gray.800')}
            spacing={5}
            rounded="lg"
            alignItems="center"
            pos="relative"
            _before={{
                content: `""`,
                w: '0',
                h: '0',
                borderColor: `transparent ${useColorModeValue('#edf2f6', '#1a202c')} transparent`,
                borderStyle: 'solid',
                borderWidth: borderWidthValue,
                position: 'absolute',
                left: leftValue,
                right: rightValue,
                display: 'block'
            }}
        >
            <Box>
                <Text fontSize="lg" color="accent.base">
                    {date}
                </Text>

                <VStack spacing={2} mb={3} textAlign="left">
                    <chakra.h1 fontSize="2xl" lineHeight={1.2} fontWeight="bold" w="100%">

                        {title}
                    </chakra.h1>
                    <Text fontSize="md">{description}</Text>
                </VStack>
                <Button
                    variant="outline"
                    display="flex"
                    alignItems="center"
                    as={ChakraLink}
                    onClick={() => openLink(new URL(link))}
                >
                    Mehr lesen {link}
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
            mr={{ base: '40px', md: '40px' }}
            ml={{ base: '0', md: '40px' }}
        >
            <chakra.span
                position="absolute"
                left="50%"
                height="calc(100% + 10px)"
                border="1px solid"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
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
                    bg={useColorModeValue('gray.600', 'gray.200')}
                    borderRadius="100px"
                    backgroundImage="none"
                    opacity={1}
                ></Box>
            </Box>
        </Flex>
    );
};

const EmptyCard = () => {
    return <Box flex={{ base: 0, md: 1 }} p={{ base: 0, md: 6 }} bg="transparent"></Box>;
};

