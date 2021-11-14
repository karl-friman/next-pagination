import { getTitles } from '../shared/films';

describe('Get Titles', () => {
  it('checks if we have any titles', async () => {
    const posts = await getTitles();

    expect(posts.length > 0).toBeTruthy();
  });
});
