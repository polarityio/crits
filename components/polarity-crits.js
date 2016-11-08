'use strict';

polarity.export = PolarityComponent.extend({
    editDescriptionMode: false,
    actions:{
        // editDescription(){
        //     this.set('editDescriptionMode', true);
        // },
        // cancelDescriptionEdit(){
        //     this.set('editDescriptionMode', false);
        // },
        // saveDescriptionEdit(){
        //     var self = this;
        //     console.info("SAving");
        //     Ember.$.ajax({
        //         url: this.get('block.data.details.patchDescriptionUri'),
        //         method: 'patch',
        //         contentType: 'application/json',
        //         crossDomain: true,
        //         headers:{
        //           'X-Frame-Options': 'SAMEORIGIN'
        //         },
        //         data: {
        //             action: "description_update",
        //             description: this.get('block.data.details.description')
        //         }
        //     }).then(function(result) {
        //         console.info("saved");
        //        self.set('editDescriptionMode', false);
        //         self.set('editDescriptionErrorMessage', '');
        //     }, function(jqXHR, textStatus, errorThrown){
        //         self.set('editDescriptionErrorMessage', JSON.stringify(textStatus));
        //         console.info(JSON.stringify(errorThrown));
        //     });
        // }
    }
});

