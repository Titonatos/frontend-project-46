const result = [
  {
    key: 'common',
    status: 'noChange',
    value: [
      {
        key: 'follow',
        status: 'added',
        value: false,
      },
      {
        key: 'setting1',
        status: 'noChange',
        value: 'Value 1',
      },
      {
        key: 'setting2',
        status: 'removed',
        value: 200,
      },
      {
        key: 'setting3',
        status: 'old',
        value: true,
      },
      {
        key: 'setting3',
        status: 'updated',
        value: null,
      },
      {
        key: 'setting4',
        status: 'added',
        value: 'blah blah',
      },
      {
        key: 'setting5',
        status: 'added',
        value:
          {
            key5: 'value5',
          },
      },
      {
        key: 'setting6',
        status: 'noChange',
        value: [
          {
            key: 'doge',
            status: 'noChange',
            value: [
              {
                key: 'wow',
                status: 'old',
                value: '',
              },
              {
                key: 'wow',
                status: 'updated',
                value: 'so much',
              }],
          },
          {
            key: 'key',
            status: 'noChange',
            value: 'value',
          },
          {
            key: 'ops',
            status: 'added',
            value: 'vops',
          },
        ],
      },
    ],
  },
  {
    key: 'group1',
    status: 'noChange',
    value: [
      {
        key: 'baz',
        status: 'old',
        value: 'bas',
      },
      {
        key: 'baz',
        status: 'updated',
        value: 'bars',
      },
      {
        key: 'foo',
        status: 'noChange',
        value: 'bar',
      },
      {
        key: 'nest',
        status: 'old',
        value:
          {
            key: 'value',
          },
      },
      {
        key: 'nest',
        status: 'updated',
        value: 'str',
      },
    ],
  },
  {
    key: 'group2',
    status: 'removed',
    value:
      {
        abc: 12345,
        deep:
          {
            id: 45,
          },
      },
  },
  {
    key: 'group3',
    status: 'added',
    value:
      {
        deep:
          {
            id:
              {
                number: 45,
              },
          },
        fee: 100500,
      },
  }];

export default result;
