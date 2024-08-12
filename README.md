# `@lit-labs/router` evaluation

Issues found:

## Optional children

If you want a route to have optional children, you have to use some regex magic to make it work.

```ts
{
  path: '/parent{/}?*?',
  render: () => html`<my-parent></my-parent>`,
  enter: async () => {
    await import('./my-parent.js');
  }
}
```

The above matches `/parent`, but also `/parent/` and `/parent/child`

## Child routes are not being reset

If you have navigated to `/parent/child` and then navigate to `/parent`, the child component is still there. This is not the expected behavior.

## Fallback route doesn't travel back up the route tree

If your root component (the one that contains the `Router` singleton) has a fallback route, for rendering a 404 page for example, if the route mismatch happens in a nested child component, the fallback route is not rendered. It just throws an `Error` in the console.

## `enter()` type does not match it's intended usage

So the docs mention the following usage for `enter`:

```ts
enter: async () => {
  await import('./my-child.js');
}
```

However, if you try to use it like this, you get a type error:

```
Type '() => Promise<void>' is not assignable to type '(params: { [key: string]: string | undefined; }) => boolean | Promise<boolean>'.
  Type 'Promise<void>' is not assignable to type 'boolean | Promise<boolean>'.
    Type 'Promise<void>' is not assignable to type 'Promise<boolean>'.
      Type 'void' is not assignable to type 'boolean'.ts(2322)

routes.d.ts(13, 5): The expected type comes from property 'enter' which is declared here on type 'RouteConfig'
```

## No `baseUrl` option for the router?

I'm not entirely sure about this one, but several routers i've used before this allow you the ability to define a `baseUrl` for the router, for when the component is nested in a website instead of at the root (/).
