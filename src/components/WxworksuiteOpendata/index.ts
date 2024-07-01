import { LitElement, css, html } from 'lit'
import { property, state } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'

export default class WxworksuiteOpendata extends LitElement {

  static componentName: string = 'wxworksuite-opendata'
  static register () {
    if (!window.customElements.get(WxworksuiteOpendata.componentName)) {
      window.customElements.define(WxworksuiteOpendata.componentName, WxworksuiteOpendata)
    }
  }

  static styles = css`
    :host {
      /* display: inline-block; */
      word-spacing: -1em;
    }
  `

  @property({ type: String })
  openid: string = ''

  @property({ type: String })
  type: string = '' // userName | departmentName | expression

  @property({ type: String })
  mode: string = 'close' // open | close

  @state()
  protected _expressionArr: any[] = []

  get wwbaseopendataRef (): any {
    return this.renderRoot?.querySelector('wxworksuite-base-opendata') ?? null
  }

  get wwbaseopendataRefs (): any {
    return this.renderRoot?.querySelectorAll('wxworksuite-base-opendata') ?? null
  }

  willUpdate (changedProperties: any) {
    if (changedProperties.has('openid')) {
      if (this.type === 'expression') {
        // this._expressionArr = [
        //   {
        //     type: 'userName',
        //     content: 'woOUQJEAAATELkAo5cgbkznEdBjmtgcA'
        //   },
        //   {
        //     type: 'text',
        //     content: '545'
        //   },
        //   {
        //     type: 'departmentName',
        //     content: '6'
        //   }
        // ]
        this._expressionArr = this._getWwValues()
        // console.log(this._expressionArr)
      } else {
        this._expressionArr = []
      }
    }
  }


  _getWwValues (): any {
    // let typeReg = /__\$\$wwopendata\(([a-zA-Z0-9]+),\s+([a-zA-Z]+)\)/
    // let reg = /__\$\$wwopendata\(([a-zA-Z0-9]+)\)/
    // let typeReg = /__\$\$wwopendata\(([^()\s,]+),\s+([a-zA-Z]+)\)/
    let reg = /__\$\$wwopendata\(([^()]+)\)/
    let matcher: any
    let index = 0
    let value = this.openid

    const res: any = []

    while (
      (matcher = value.match(reg))
    ) {
      let code = ''
      let openDataType = ''
      if (matcher[1].includes(',')) {
        const split = matcher[1].split(',')
        code = split[0].trim()
        openDataType = split[1].trim()
      } else {
        code = matcher[1]
      }

      if (matcher.index > 0) {
        res.push({
          type: 'text',
          content: value.slice(0, matcher.index)
        })
      }
      value = value.slice(matcher.index + matcher[0].length)
      res.push({
        type: openDataType,
        content: code
      })
      index += matcher.index + matcher[0].length
    }
    if (index && index < this.openid.length) {
      res.push({
        type: 'text',
        content: this.openid.slice(index)
      })
    }

    if (!res.length) {
      res.push({
        type: 'text',
        content: this.openid
      })
    }

    return res
  }


  getValue () {
    if (this.type === 'expression') {
      console.log(this.wwbaseopendataRefs)
      const data: any = {
        type: this.type,
        openid: this.openid,
        name: null
      }
      if (this.wwbaseopendataRefs?.length) {
        // const values = this.wwbaseopendataRefs[0].getValue()
        // const values = this.wwbaseopendataRefs.map((item: any) => {
        //   return item.getValue()
        // })
        this.wwbaseopendataRefs.forEach((item: any) => {
          console.log(item.getValue())
          const value = item.getValue()
          const sel = this._expressionArr.find((item2) => (item2.type === value.type && item2.content === value.openid))
          if (sel) {
            sel.name = value.name
          }
        })
        // console.log(values)
        const nameValue = this._expressionArr.map((item) => {
          return item.name || item.content
        }).join('')
        if (nameValue) {
          data.name = nameValue
        }
        return data
      } else {
        return data
      }
    } else {
      if (this.wwbaseopendataRef) {
        // console.log(this.wwbaseopendataRef)
        // debugger
        const value = this.wwbaseopendataRef.getValue()
        return value
      } else {
        const data: any = {
          type: this.type,
          openid: this.openid,
          name: null
        }
        return data
      }
    }
  }

  setValue (obj: any) {
    this.type = obj.type
    this.openid = obj.openid
  }

  render () {
    return html`
      ${
        this.type === 'expression'
        ?
        html`
          ${
            this._expressionArr.length
            ?
            html`
              ${repeat(
                this._expressionArr,
                (item: any) => item.content,
                (item, index) => html`
                  ${
                    item.type !== 'text'
                    ?
                    html`<wxworksuite-base-opendata type="${item.type}" openid="${item.content}" mode="${this.mode}"></wxworksuite-base-opendata>`
                    :
                    // html`<span>${item.content}</span>`
                    html`${item.content}`
                  }
                `
              )}
            `
            :
            ''
          }
        `
        :
        html`<wxworksuite-base-opendata type="${this.type}" openid="${this.openid}" mode="${this.mode}"></wxworksuite-base-opendata>`
      }
    `
  }
}
