function createLocale() {
    let language = $state("en");
    let region = $state("US");

    function setLanguage(value) {
      language = value;
    }

    function setRegion(value) {
      region = value;
    }
    
    return {
      get language() {
        return language;
      },
      get region() {
        return region;
      },
      setLanguage,
      setRegion
    };
  }
  
  export const locale = createLocale();