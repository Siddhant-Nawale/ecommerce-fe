// map of key as policies
export interface PolicyConfig {
  roles: string[];
}
export const userFetchAndPolicyConfig: Record<string, PolicyConfig> = {
  management: { roles: ["admin"] },
};