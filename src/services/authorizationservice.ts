import { User } from "../contexts/UserContext";

class Authorizationservice {
  private static instance: Authorizationservice;
  private authorized: { [policy: string]: boolean } = {};
  private constructor() {}

  // Method to get the single instance of the class
  public static getInstance(): Authorizationservice {
    if (!Authorizationservice.instance) {
      Authorizationservice.instance = new Authorizationservice();
    }
    return Authorizationservice.instance;
  }

  public initialiseAuthorization(user: User) {
    user?.policies.forEach((policy) => {
      this.authorized[policy.name] = true;
    });
  }

  public authorise(policy: string | null) {
    if (!policy) return false;
    return this.authorized[policy];
  }
}

// Export the singleton instance
const authorizationservice = Authorizationservice.getInstance();
export default authorizationservice;
