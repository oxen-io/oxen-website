const MAP_BOX_USERNAME = 'oxenvince';
const MAP_BOX_STYLE_ID = 'ckj6mv0zb04uz1amskq1bpi3u';

export const getMapBoxStaticSource = (
  lat: number,
  lng: number,
  width?: number,
  height?: number,
) =>
  `https://api.mapbox.com/styles/v1/${MAP_BOX_USERNAME}/${MAP_BOX_STYLE_ID}/static/${lat},${lng},8.5,0,60/${
    width ?? 1200
  }x${
    height ?? 300
  }?access_token=pk.eyJ1IjoidGFzdGllc3R2aW5jZSIsImEiOiJja2VnaXp0bzkwZWM0MzJxYng3OW9qZnY5In0.xA1wKv2WJEZUU9XvdlolLg`;
