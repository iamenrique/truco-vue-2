(function (Vue) {

    /**
     *  Descriptores:
     *      Las siguientes 3 funciones sirven para devolver objetos con la estructura que un componente de Vue
     *      requiere.
     *
     *      ¿Por qué usar este tipo de funciones y no escribir el objeto inline?
     *          En mi humilde opinión, englobar dichos objetos de esta manera ayuda a tener un código más limpio
     *          y estructurado. Si estamos trabajando con una herramienta que promueve el uso de componentes, debemos
     *          estar consientes de que tener una estructura mantenible y reusable es primordial.
     *
     *          Otra ventaja es que si tienes la necesidad de utilizar un componente en otro lado, puedes copiar y
     *          llevarte la función completa y no se romperá absolutamente nada ya que la función descriptora debe
     *          ser ajena al contexto donde se define.
     *
     *      REGLA DE ORO: ¡DIVIDE (adecuadamente) Y VENCERÁS!
     *          Un componente es una caja negra. Un componente padre no debe preocuparse por qué sucede en un
     *          componente hijo, solo debe manejar la comunicación con él.
     **/
    function getCommentDescriptor() {
        return {
            data: function () {
                return {}
            },
            props: ['model'],
            template: `
                <div class="wt-comment">
                    <p class="wt-comment__subject">{{model.subject}}</p>
                    <p class="wt-comment__body">{{model.body}}</p>
                </div>
            `
        }
    }

    function getCommentListDescriptor() {
        return {
            data: function () {
                return {}
            },
            props: ['comments'],
            components: {
                'comment': getCommentDescriptor()
            },
            template: `
                <div class="wt-comment-list">
                    <comment v-for="c of comments" :key="c.id" :model="c"></comment>
                </div>
            `
        }
    }

    function getCommentEditorDescriptor() {
        return {
            data: function () {
                return {}
            },
            template: '<div class="wt-comment-editor"><textarea class="wt-comment-editor__input" placeholder="Escribe algo..."></textarea><button class="wt-comment-editor__button" type="button">Enviar</button></div>'
        }
    }

    function initVueWidget() {
        // 3. Creamos una instancia de Vue que contendrá el widget completo. En este punto, la única condición es
        //      que exista un elemento con id "vue-comments-widget" en el DOM. El resto son referencias locales u
        //      objetos generados dinámicamente, tal es el caso de los componentes hijos usados en el widget.

        return new Vue({
            el: '#vue-comments-widget',
            components: {
                'comment-editor': getCommentEditorDescriptor(),
                'comment-list': getCommentListDescriptor()
            },
            template: `
                <section class="wt-comments">
                    <comment-editor></comment-editor>
                    <comment-list :comments="comments"></comment-list>
                </section>
            `,
            data: {
                comments: [{
                    id: 0,
                    subject: 'Hello World!',
                    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque et facilis illo nemo reprehenderit totam ut voluptatem voluptatum. Consequatur dignissimos, ducimus eveniet laboriosam numquam pariatur quae ratione repudiandae velit voluptatem.'
                },{
                    id: 1,
                    subject: 'Hello America!',
                    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque et facilis illo nemo reprehenderit totam ut voluptatem voluptatum. Consequatur dignissimos, ducimus eveniet laboriosam numquam pariatur quae ratione repudiandae velit voluptatem.'
                },{
                    id: 2,
                    subject: 'Hello México!',
                    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque et facilis illo nemo reprehenderit totam ut voluptatem voluptatum. Consequatur dignissimos, ducimus eveniet laboriosam numquam pariatur quae ratione repudiandae velit voluptatem.'
                },{
                    id: 3,
                    subject: 'Hello Veracruz!',
                    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque et facilis illo nemo reprehenderit totam ut voluptatem voluptatum. Consequatur dignissimos, ducimus eveniet laboriosam numquam pariatur quae ratione repudiandae velit voluptatem.'
                },{
                    id: 4,
                    subject: 'Hello Coatzacoalcos!',
                    body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque et facilis illo nemo reprehenderit totam ut voluptatem voluptatum. Consequatur dignissimos, ducimus eveniet laboriosam numquam pariatur quae ratione repudiandae velit voluptatem.'
                }]
            },
            mounted: function () {
                console.log('Comments Widget: Successfully mounted!')
            }
        })
    }

    // Función similar a $(document).ready(...) con VanillaJS
    function onDocumentReady(callback) {
        if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
            callback()
        } else {
            document.addEventListener("DOMContentLoaded", callback)
        }
    }

    // 1. Esperamos a que el DOM esté listo.
    onDocumentReady(function () {
        // 2. Una vez listo, creamos nuestro widget con Vue.
        let commentsWidget = initVueWidget()

        // Aquí tienes la referencia al widget completo. Puedes hacer con ella lo que gustes.
        // Yo he decidido exponerlo como una propiedad de objeto window.
        window.commentsWidget = commentsWidget

    })

})(window.Vue)
