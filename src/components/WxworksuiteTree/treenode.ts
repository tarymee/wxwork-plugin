import { LitElement, css, html } from 'lit'
import { property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'
import { repeat } from 'lit/directives/repeat.js'

// import icon_right from './img/icon_right.png'

const icon_right = require('./img/icon_right.png')
console.log(icon_right)

export default class WxworksuiteTreenode extends LitElement {

  static componentName: string = 'wxworksuite-treenode'
  static register () {
    if (!window.customElements.get(WxworksuiteTreenode.componentName)) {
      window.customElements.define(WxworksuiteTreenode.componentName, WxworksuiteTreenode)
    }
  }

  static styles = css`
    :host {
      display: block
    }

    .tree-node {
      display: block;
    }
    .tree-node-line {
      display: flex;
      width: 100%;
      height: 54px;
      line-height: 54px;
      fone-size: 16px;
      align-items: center;
      cursor: pointer;
      box-sizing: border-box;
      border-bottom: 1px solid #E5E5E5;
    }
    .tree-node-line-select {
      background-color: rgba(000, 000, 000, 0.2);
    }
    .tree-node-line:hover {
      background-color: rgba(000, 000, 000, 0.1);
    }
    // .tree-node-line:focus {
    //   background-color: rgba(000, 000, 000, 0.1);
    // }
    // .tree-node-line:active {
    //   background-color: rgba(000, 000, 000, 0.1);
    // }

    .tree-node-icon {
      flex: none;
      width: 20px;
      height: 20px;
      // background: red;
    }
    .tree-node-icon-1 {
      transition: all 0.3s;
      transform: rotate(90deg);

      font-size: 0;
      width: 0;
      height: 0;
      line-height: 0;
      overflow: hidden;
      display: block;
      border: 0 dashed transparent;
      border-width: 6px;
      border-left-style: solid;
      border-left-color: #777;
      margin: 4px;
    }
    .tree-node-icon-0 {
      transition: all 0.3s;

      font-size: 0;
      width: 0;
      height: 0;
      line-height: 0;
      overflow: hidden;
      display: block;
      border: 0 dashed transparent;
      border-width: 6px;
      border-left-style: solid;
      border-left-color: #777;
      margin: 4px;
    }
    .tree-node-name {
      flex: 1;
      color: #666;
      word-break: keep-all;
    }
    .tree-node-check {
      flex: none;
      width: 20px;
      height: 20px;
      margin: 0 12px;
    }
    .tree-node-check-1 {
      width: 18px;
      height: 18px;
      border-radius: 2px;
      border: 1px solid #05a;
      background: #05a;
    }
    .tree-node-check-0 {
      width: 18px;
      height: 18px;
      border-radius: 2px;
      border: 1px solid #05a;
    }
    .tree-node-check-2 {
      width: 18px;
      height: 18px;
      border-radius: 2px;
      border: 1px solid #05a;
      background: yellow;
    }



    .tree-node-children {
      padding-left: 20px;
    }
    .tree-node-name-noicon {
      padding-left: 20px;
    }

  `

  @property({ type: Object })
  node: any = {}

  @property({ type: Boolean })
  updatepoint: boolean = false

  @property({ type: Boolean })
  ismulselect: boolean = false

  constructor () {
    super()
  }

  connectedCallback () {
    super.connectedCallback()
  }

  private toggle (type: 'expand' | 'select' | 'check') {
    console.log(type)
    this.dispatchEvent(new CustomEvent('toggle', {
      bubbles: true,
      composed: true,
      detail: {
        type: type,
        node: this.node
      }
    }))
  }

  private clickNode () {
    if (this.ismulselect) {
      this.toggle('check')
    } else {
      this.toggle('select')
    }
  }

  handleToggle (e: any) {
    this.dispatchEvent(new CustomEvent('toggle', {
      bubbles: true,
      composed: true,
      detail: e.detail
    }))
  }

  private test () {
    console.log(this)
  }

  // children isselected: ${this.node.isselected}<br />
  // children ischecked: ${this.node.ischecked}<br />
  // children checkstate: ${this.node.checkstate}<br />
  // children ismulselect: ${this.ismulselect}
  render () {
    return html`
      <div class="tree-node">
        <div class="tree-node-line" tabindex="-1" class=${classMap({
          'tree-node-line': true,
          'tree-node-line-select': this.node.isselected
        })}>

          <div class="tree-node-icon">
            ${
              this.node?.children?.length
              ?
              html`
                <div
                  @click="${(e: Event) => this.toggle('expand')}"
                  class=${classMap({
                    'tree-node-icon-1': this.node.isexpand,
                    'tree-node-icon-0': !this.node.isexpand
                  })}
                >
                </div>
              `
              :
              ''
            }
          </div>




          <div
            @click="${this.clickNode}"
            class=${classMap({
              'tree-node-name': true
            })}
          >
            ${this.node.name}
          </div>


          ${
            this.ismulselect
            ?
            html`
              <div
                @click="${(e: Event) => this.toggle('check')}"
                class=${classMap({
                  'tree-node-check': true,
                  'tree-node-check-0': this.node.checkstate === '0',
                  'tree-node-check-1': this.node.checkstate === '1',
                  'tree-node-check-2': this.node.checkstate === '2'
                })}
              >
              </div>
            `
            :
            ''
          }

        </div>

        <div
          class="tree-node-children"
          style=${styleMap({
            display: !this.node.isexpand ? 'none' : 'block',
          })}
        >
          ${
            this.node?.children?.length
            ?
            html`
              ${repeat(this.node.children, (item: any) => item.uuid, (item, index) => html`
                <wxworksuite-treenode
                  .node="${item}"
                  .ismulselect="${this.ismulselect}"
                  .updatepoint="${this.updatepoint}"
                >
                </wxworksuite-treenode>
              `)}
              <!--
              ${
                this.node?.children?.length
                ?
                html`
                  ${this.node.children.map((item: any) => {
                    return html`
                      <wxworksuite-treenode
                        .node="${item}"
                        .ismulselect="${this.ismulselect}"
                        .updatepoint="${this.updatepoint}"
                        @toggle="${this.handleToggle}"
                      >
                      </wxworksuite-treenode>
                    `
                  })}
                `
                :
                ''
              }
              -->
            `
            :
            ''
          }
        </div>
      </div>
    `
  }
}

