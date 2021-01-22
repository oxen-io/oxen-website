// client.js
import sanityClient from '@sanity/client';

export const SANITY_CONSTATNTS = {
  PROJECT_ID: 'q2qmxra4',
  DATASET: 'production',
};

export default sanityClient({
  projectId: SANITY_CONSTATNTS.PROJECT_ID, // you can find this in sanity.json
  dataset: SANITY_CONSTATNTS.DATASET, // or the name you chose in step 1
  useCdn: true, // `false` if you want to ensure fresh data
});
