// import React from 'react';
// import { Box } from '@mui/material';
// import Header from '../utils/Headers';
// import datas from '../../datas/mockDataTreeMap.js';
// import { ResponsiveTreeMap } from '@nivo/treemap';
// function TreeMapCharts() {
//   return (
//     <Box sx={{ height: '50%' }}>
//       <Header
//         variant="h6"
//         title="Ölçümler Grafiği"
//         fontSize="1.5rem"
//         margin="0 0 0 1rem"
//         color="primary"
//       />
//       <Box sx={{ height: '30vh' }}>
//         <ResponsiveTreeMap
//           data={datas[0]}
//           identity="name"
//           value="loc"
//           valueFormat=".02s"
//           margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
//           labelSkipSize={12}
//           labelTextColor={{
//             from: 'color',
//             modifiers: [['darker', 1.2]],
//           }}
//           parentLabelPosition="left"
//           parentLabelTextColor={{
//             from: 'color',
//             modifiers: [['darker', 2]],
//           }}
//           borderColor={{
//             from: 'color',
//             modifiers: [['darker', 0.1]],
//           }}
//         />
//       </Box>
//     </Box>
//   );
// }

// export default TreeMapCharts;
