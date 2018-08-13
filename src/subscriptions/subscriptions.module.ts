import {DynamicModule, Module} from "@nestjs/common";
import {SubscriptionsService} from "./subscriptions.service";
import {createSubscriptionProviders} from "./subscriptions.providers";

@Module({
  providers: [SubscriptionsService],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {
  static forRoot(port: number = 3001): DynamicModule {
    const providers = createSubscriptionProviders(port);
    return {
      module: SubscriptionsModule,
      providers: [...providers],
      exports: [...providers]
    };
  }
}
