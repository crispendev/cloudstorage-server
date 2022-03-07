import { UserContext } from "../../types";
import { Arg, Ctx, Float, Mutation, Resolver } from "type-graphql";
import { User } from "../../entities/User/User";

@Resolver()
export class UpdateStorageResolver {
  @Mutation(() => Boolean)
  async updateStorage(
    @Arg("size", () => Float) size: number,
    @Ctx() { req }: UserContext
  ): Promise<Boolean> {
    const user = await User.findOne(
      { uid: req.session?.userId },
      { relations: ["profile"] }
    );
    if (!user) return false;
    user.usedStorage += size;
    await user.save();
    return true;
  }
}
