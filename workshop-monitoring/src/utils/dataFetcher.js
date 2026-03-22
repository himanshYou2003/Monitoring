// Simulated data fetcher to mimic a professional industrial backend
export const fetchWorkshopData = () => {
  const generateValue = (base, range) => (base + (Math.random() * range - range / 2)).toFixed(1);

  const data = {};
  const lineNames = ['RJT-VL-KJ1', 'RJT-VL-KJ2', 'RJT-VL-KJ3', 'RJT-VL-KJ4'];
  const roomsPerLine = {
      'RJT-VL-KJ1': ['ROOM 5', 'ROOM 6'],
      'RJT-VL-KJ2': ['ROOM 7', 'ROOM 8'],
      'RJT-VL-KJ3': ['ROOM 9', 'ROOM 10'],
      'RJT-VL-KJ4': ['ROOM 11', 'ROOM 12'],
  };

  lineNames.forEach(line => {
      data[line] = {
          metrics: {
              oee: generateValue(85, 10),
              availability: generateValue(92, 5),
              performance: generateValue(88, 7),
              quality: generateValue(98, 2),
              status: Math.random() > 0.9 ? 'Warning' : 'Optimal'
          },
          rooms: {}
      };
      roomsPerLine[line].forEach(room => {
          data[line].rooms[room] = {
              "PROPELIA-1": generateValue(120, 10),
              "SUBPROPELIA-1": generateValue(110, 5),
              "PROPELIA-2": generateValue(115, 8),
              "SUBPROPELIA-2": generateValue(105, 4),
              "PROPELIA-3": generateValue(125, 12),
              "SUBPROPELIA-3": generateValue(115, 6),
              "PROPELIA-4": generateValue(130, 15),
              "SUBPROPELIA-4": generateValue(120, 10),
              "PROPELIA-5": generateValue(140, 20)
          };
      });
  });

  return {
      lines: data,
      global: {
          oee: generateValue(88.4, 2),
          availability: generateValue(94.2, 1),
          performance: generateValue(91.5, 2),
          quality: generateValue(99.1, 0.5),
          throughput: 165 + Math.floor(Math.random() * 20),
          activeAlerts: Math.random() > 0.85 ? 1 : 0
      },
      assets: [
          { id: 'ARM-902', name: 'Primary Assembly Arm', health: 94, vibration: 0.12, temp: 42, status: 'Optimal', type: 'Robotic' },
          { id: 'KJ-SYNC-1', name: 'Neural Sync Hub', health: 88, vibration: 0.45, temp: 48, status: 'Warning', type: 'Infrastructure' },
          { id: 'SR-220', name: 'Scanning Relay B', health: 99, vibration: 0.08, temp: 36, status: 'Optimal', type: 'Optical' },
          { id: 'PACK-V4', name: 'Vector Packager', health: 76, vibration: 0.88, temp: 54, status: 'Critical', type: 'Mechanical' }
      ],
      events: [
          { time: '10:42', type: 'System', msg: 'Line KJ2: Flow Optimization Active' },
          { time: '10:38', type: 'Warning', msg: 'Room 7: High Pressure on P3' },
          { time: '10:15', type: 'Info', msg: 'Shift Change Completed' }
      ],
      safety: {
          integrity: 99.8,
          activeAlerts: 0,
          status: 'Nominal',
          personnel: [
              { id: '0018-A', name: 'Himanshu kumar', role: 'Chief Overseer', status: 'AUTH', bio: 72, heartRate: 72 },
              { id: '0449-C', name: 'Dr. Sarah Vance', role: 'Safety Lead', status: 'AUTH', bio: 98, heartRate: 78 },
              { id: 'D-9211', name: 'Unit-04 Automata', role: 'Maintenance', status: 'ACTIVE', bio: 100, heartRate: 0 }
          ],
          logs: [
              { time: '18:42:01', event: 'Perimeter Sweep', status: 'Clear', sector: 'Sector 4' },
              { time: '18:40:15', event: 'Bio-Auth Check', status: 'Verified', sector: 'Main Entry' },
              { time: '18:35:54', event: 'E-Stop Test', status: 'Passed', sector: 'Global' }
          ],
          sectors: {
              A: 'CLEAR',
              B: 'CLEAR',
              C: 'ACTIVE',
              D: 'CLEAR'
          }
      }
  };
};

export const initialAnalytics = (count = 10) => {
    return Array.from({ length: count }, () => Math.floor(Math.random() * 100));
};
