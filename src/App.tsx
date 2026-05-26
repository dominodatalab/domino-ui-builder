import {
  Button,
  Card,
  IconResolver,
  Space,
  Typography,
  useGetThemeValue,
} from "@domino/base-components";

export default function App() {
  // Resolve visual values through tokens — see CLAUDE.md "Design system rules".
  const background = useGetThemeValue("palette.bgLight1");
  const padding = useGetThemeValue("spacing.large");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding,
        background,
      }}
    >
      <div style={{ maxWidth: 520, width: "100%" }}>
        <Card
          title="Welcome to Domino"
          helpMessage="This scaffold is wired up with @domino/base-components, the Domino Design System component library."
          extra={
            <Button
              type="link"
              icon={
                <IconResolver
                  iconSize="xSmall"
                  collection="light"
                  icon="BookOpen"
                  aria-label="docs"
                />
              }
              href="https://main--60c0de3f60dd96003bdcb1a1.chromatic.com/"
              target="_blank"
              rel="noreferrer"
            >
              Storybook
            </Button>
          }
        >
          <Space direction="vertical" gap="spacingMedium" style={{ width: "100%" }}>
            <Typography.Text>
              You're all set up. Edit{" "}
              <Typography.Text type="BodyCode">src/App.tsx</Typography.Text> to
              start composing your UI with Domino components.
            </Typography.Text>

            <Typography.Text type="BodySmall">
              Ask Claude for any component by name — Button, DominoTable, Modal,
              DominoForm — and it will use the verified API reference shipped
              with this project.
            </Typography.Text>

            <Space gap="spacingSmall">
              <Button
                type="primary"
                icon={
                  <IconResolver
                    iconSize="xSmall"
                    collection="light"
                    icon="Rocket"
                    aria-label="get started"
                  />
                }
              >
                Get started
              </Button>
              <Button type="secondary">View examples</Button>
            </Space>
          </Space>
        </Card>
      </div>
    </div>
  );
}
