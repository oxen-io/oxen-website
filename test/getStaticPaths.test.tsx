import dotenv from 'dotenv';
import { getStaticPaths } from '../pages/[page]';

interface IPath {
  params: { slug: string };
}

dotenv.config();

describe('getStaticPaths', () => {
  test('', async () => {
    const { paths } = await getStaticPaths();

    console.log('getStaticPaths.test ➡️     paths:', paths);
  });
});
