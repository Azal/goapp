/*
/* Rule information for main types
/*
/**/
export class RulesType {
  /* Rules names */
  static JAPANESE: string = "japanese";
  static CHINESE:  string = "chinese";
  static KOREAN:   string = "korean";
  static AGA:      string = "aga";

  /* Base settings */
  /*
  /* static _base_settings = {
  /*   "komi": "",                             /* 6.5 or 7.5 */
  /*   "handicap_type": "",                    /* fixed or free */
  /*   "handicap_score_adjusment": "",         /* none or additional_point */
  /*   "on_passing": "",                       /* none or gives_prisoner */
  /*   "self_capture": "",                     /* yes or no */
  /*   "super_ko": "",                         /* forbidden, allowed or special */
  /*   "ending_game": "",                      /* two_passes or white_last_pass */
  /*   "stone_removal": "",                    /* agreed or special */
  /*   "dame_filling_on_stone_removal": "",    /* no, agreed or alternating */
  /*   "dame_negate_territory": "",            /* yes or no */
  /*   "player_after_stone_removal_phase": "", /* last_pass or opponent_resuming_player */
  /*   "scoring": ""                           /* territory, area, any */
  /* }
  /* */


  /* Rules default settings */
  public static getDefaultRulesFor(rule_type: string) {
    var settings = {};

    switch (rule_type) {
      case RulesType.JAPANESE:
        settings["komi"] = 6.5;
        settings["handicap_type"] = "fixed";
        settings["handicap_score_adjusment"] = "none";
        settings["on_passing"] = "none";
        settings["self_capture"] = "no";
        settings["super_ko"] = "allowed";
        settings["ending_game"] = "two_passes";
        settings["stone_removal"] = "special";
        settings["dame_filling_on_stone_removal"] = "agreed";
        settings["dame_negate_territory"] = "yes";
        settings["player_after_stone_removal_phase"] = "opponent_resuming_player";
        settings["scoring"] = "territory";
        break;
      case RulesType.CHINESE:
        settings["komi"] = 7.5;
        settings["handicap_type"] = "free";
        settings["handicap_score_adjusment"] = "additional_point";
        settings["on_passing"] = "none";
        settings["self_capture"] = "no";
        settings["super_ko"] = "forbidden";
        settings["ending_game"] = "two_passes";
        settings["stone_removal"] = "agreed";
        settings["dame_filling_on_stone_removal"] = "no";
        settings["dame_negate_territory"] = "no";
        settings["player_after_stone_removal_phase"] = "last_pass";
        settings["scoring"] = "area";
        break;
      case RulesType.KOREAN:
        settings = {}
        break;
      case RulesType.AGA:
        settings = {}
        break;
      default:
        settings = {}
    }

    return settings;
  }
}
