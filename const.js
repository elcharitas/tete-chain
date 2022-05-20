export const app_name = "Tete Decentralized Betting Platform";
export const tete_addr = "0x1B40C05f898460E28E7295e99a37C501ff0e3960";
export const tete_abi = ["function CreateBettingPool()"];

export const home_slides = [
    {
        bg: "tete.hover",
        intro:
            "Welcome to Tété, we are using Betting as an Instrument of Social Change.",
        image: "/header.png",
        buttons: [
            {
                text: "Create Pool",
                href: "/pools/create",
            },
            {
                text: "Place a Bet",
            },
        ],
    },
    {
        bg: "tete.card",
        intro:
            "Everytime you WIN, Someone on the streets also WIN. Together , let’s take Young Girls and Boys off the street.",
        image: "/wallet.png",
        buttons: [
            {
                text: "Donate Now",
                bg: "white",
                color: "purple.500",
            },
            {
                text: "Learn More",
            },
        ],
    },
    {
        bg: "tete.hover",
        intro:
            "From Grammy, BET Awards, Oscars, You can now stake on your Favourite nominee from any Category.",
        image: "/grammy.png",
        buttons: [
            {
                text: "Start Here",
            },
        ],
    },
];
