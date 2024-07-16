# React + TypeScript Technical Test


Thank you for taking the time to review this project. I'm excited to share my work with you and look forward to your feedback.

## Demo

Visit the deployed application: [Water Filler](https://water-filler.vercel.app/)

## Installation

To set up this project locally, follow these steps:

1. **Clone the Repository**

   First, clone the project repository to your local machine using Git:

   ```bash
   git clone https://github.com/incari/water-filler
   cd your-repository-name

   ```

2. **Install**

   ```bash
   npm install  or yarn install

   ```

3. **Run the App**

   ```bash
   npm run dev  or yarn dev
   
   ```


## Tech Stack

- Typescript.
- Tailwind Css.
- Next.js 14
- SWR (stale-while-revalidate) by Next.js

## Explanation

### Backend

One of the requirements was to implement real-time data updates. However, using Next.js as framework and Vercel for deployment, we cannot use custom backend services or WebSockets. As an alternative, I decided to use SWR which is provided by the Next.js API. 

Instead of pushing new data, SWR offers an approach where data is requested from the cache while simultaneously making a new request to update it. This ensures that the components receive a constant and automatic stream of data updates, keeping the UI fast and reactive.

To achieve real-time data updates, I added two small controls at the top of the page. These controls allow users to customize the update interval, which dictates how often new data is fetched. This functionality provides flexibility and ensures that users can control the frequency of data updates according to their preferences or requirements.

The app maintains the timestamp of the last data request. And is used to determine whether it's time to simulate new data or return the previous value.

Refresh: How often do the fetching new data.

Update: How often the data change.

### Frontend / UI

On the UI side, it display a table that show the prices of each bottle size on each station. Calculating the total price for the amount required and highlighting it. This way the user can easily identify the best station to go.

Working with tables in mobile view is always hard, so I decided to hide the info of each liter price and display the relevant information, the name of the station and the total price.

It have mainly two components:
- The Number input reused in the amount of liter requested and in the controls previously commented

- Plus the table component that has the header and row that handle the data for each station and a Skeleton while loading.

In the table header, a small numbers appears next to the bottle size showing how many of this bottles the user will require. 


