import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'

// @customElement('wxwork-test')
export default class WxworkTest extends LitElement {

  static componentName: string = 'wxwork-test'
  static register () {
    if (!window.customElements.get(WxworkTest.componentName)) {
      window.customElements.define(WxworkTest.componentName, WxworkTest)
    }
  }

  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    :host {
      color: red;
    }
  `

  @property({ type: String })
  name1?: string = 'World'

  @property({ attribute: false })
  active = 'false'

  declare count: number
  declare foo: string
  declare classes: any
  declare obj: any
  declare arr: any
  declare flag: boolean
  static properties = {
    count: {
      type: Number
    },
    foo: {
      type: String
    },
    classes: {
      type: Object
    },
    obj: {
      type: Object
    },
    arr: {
      type: Array
    },
    flag: {
      type: Boolean
    },
    _aaa: {
      state: true
    }
  }

  _aaa = '_aaa'

  styleObj = {
    color: 'blue'
  }

  constructor () {
    super()
    this.foo = 'Default'
    this.count = 0
    this.classes = { 'lit-button': true, someclass: true, anotherclass: true }
    this.obj = {
      aaa: 'aaa'
    }
    this.arr = [
      {
        aaa: 'aaa'
      }
    ]
    this.flag = false
  }

  firstUpdated () {
    console.log('firstUpdated')
    console.log(this)
    console.log(this.renderRoot)
    console.log(this.foo)
    console.log(this.count, typeof this.count)
    console.log(this.classes)
    console.log(this.obj)
    console.log(this.arr)
    console.log(this.flag, typeof this.flag)
    console.log(this.styleObj)
  }

  private change (e: Event) {
    console.log(this)
    console.log(this.renderRoot)
    console.log(this.foo)
    console.log(this.count, typeof this.count)
    console.log(this.classes)
    console.log(this.obj)
    console.log(this.arr)
    console.log(this.flag, typeof this.flag)
    console.log(this.styleObj)

    this.count++
    this.styleObj.color = 'red'
    this.flag = !this.flag
    // this.aaa = this.aaa + this.aaa
  }

  private test (e: Event) {
    console.log(this)
  }

  render () {
    // return html`<p>Hello, ${this.foo}!</p>`
    // return html`<p>Hello,!</p>`

    // <div>
    //   ${this.name1}!
    // </div>

    return html`
      <div class=${classMap(this.classes)} style=${styleMap(this.styleObj)} @click="${this.change}">
        ${this.foo}, ${this.count}, ${this._aaa}!${this.name1}${this.active}!
      </div>
      ${this.flag ? html`<ul @click="${this.test}"><li>aaaa</li></ul>` : ''}
    `
  }
}

// window.customElements.define('wxwork-test', WxworkTest)
