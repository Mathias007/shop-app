export type AddProductToBasketResponse =
    | {
          isSuccess: true;
          index: number;
      }
    | {
          isSuccess: false;
      };

export interface RemoveProductFromBasketResponse {
    isSuccess: boolean;
}
