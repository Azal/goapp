import {RuleType} from "./rule_types/RuleType";
import {JapaneseRuleType} from "./rule_types/JapaneseRuleType";
import {ChineseRuleType} from "./rule_types/ChineseRuleType";
import {KoreanRuleType} from "./rule_types/KoreanRuleType";
import {AGARuleType} from "./rule_types/AGARuleType";

export class RuleTypeFactory {
  static makeNew(key: string, scoring_method?: string): RuleType {
    switch (key) {
      case "japanese":
        return new JapaneseRuleType();
      case "chinese":
        return new ChineseRuleType();
      case "korean":
        return new KoreanRuleType();
      case "aga":
        /* Setting extra parameters */
        var scoring_method = scoring_method || "territory";
        var ruleType = new AGARuleType();

        ruleType.setScoringMethod(scoring_method);

        return ruleType;
      default:
        return new RuleType();
    }
  }
}
