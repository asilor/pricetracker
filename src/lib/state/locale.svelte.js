function createLocale() {
    let language = $state("es");
    let region_id = $state("67942b3721cc010007e278df");

    function setLanguage(value) {
      language = value;
    }

    function setRegion(value) {
      region_id = value;
    }
    
    return {
      get language() {
        return language;
      },
      get region_id() {
        return region_id;
      },
      setLanguage,
      setRegion
    };
  }
  
  export const locale = createLocale();