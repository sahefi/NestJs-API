import { TokenMiddleware } from './token.middleware';

describe('TokenMiddleware', () => {
  it('should be defined', () => {
    expect(new TokenMiddleware()).toBeDefined();
  });
});
